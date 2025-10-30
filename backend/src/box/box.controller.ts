import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/orm.js';
import { Box } from './box.entity.js';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

function sanitizeBoxInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    estado: req.body.estado,
    nroBox: req.body.nroBox,
    precioMensualBase: req.body.precioMensualBase,
  };
  
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) { 
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  const em = orm.em.fork();
  try {
    const { estado } = req.query;
    const where: any = {};
    
    if (estado) {
      where.estado = estado.toString();
    }
    
    const boxes = await em.find(Box, where);
    res.status(200).json({ 
      message: estado ? `Boxes filtrados por estado: ${estado}` : 'Todos los boxes',
      data: boxes 
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error al buscar boxes',
      error: error.message
    });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const id = Number.parseInt(req.params.id);
    const box = await em.findOneOrFail(Box, { id });
    res.status(200).json({ message: 'Box encontrado', data: box });
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      res.status(404).json({ message: 'Box no encontrado' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

async function add(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    
    // Validar datos antes de crear el box
    const boxInstance = plainToInstance(Box, req.body);
    const errors = await validate(boxInstance);

    if (errors.length > 0) {
      const messages = errors.map((err: ValidationError) => Object.values(err.constraints || {})).flat();
      return res.status(400).json({ message: 'Error de validación', errors: messages });
    }

    const newBox = em.create(Box, req.body);
    await em.persistAndFlush(newBox);
    res.status(201).json({ message: 'Box creado correctamente', data: newBox });
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error al crear box',
      error: error.message
    });
  }
}

async function update(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const id = Number.parseInt(req.params.id);
    const boxToUpdate = await em.findOneOrFail(Box, { id });

    // Validar datos nuevos
    const boxInstance = plainToInstance(Box, req.body);
    const errors = await validate(boxInstance, { skipMissingProperties: true });

    if (errors.length > 0) {
      const messages = errors.map((err) => Object.values(err.constraints || {})).flat();
      return res.status(400).json({ message: 'Error de validación', errors: messages });
    }

    em.assign(boxToUpdate, req.body);
    await em.persistAndFlush(boxToUpdate);
    res.status(200).json({ message: 'Box actualizado correctamente', data: boxToUpdate });
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      res.status(404).json({ message: 'Box no encontrado' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

async function remove(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const id = Number.parseInt(req.params.id);
    const boxToRemove = await em.findOneOrFail(Box, { id });
    await em.removeAndFlush(boxToRemove);
    res.status(200).json({ message: 'Box eliminado correctamente' });
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      res.status(404).json({ message: 'Box no encontrado' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

export { sanitizeBoxInput, findAll, findOne, add, update, remove };