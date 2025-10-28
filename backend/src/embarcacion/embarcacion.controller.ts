import { Request, Response, NextFunction } from 'express';
import { Embarcacion } from './embarcacion.entity.js'; 
import { orm } from '../shared/orm.js'; 
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const em = orm.em;

function sanitizeEmbarcacionInput(req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    matricula: req.body.matricula,
    eslora: req.body.eslora,
    tipoEmbarcacion: req.body.tipoEmbarcacion,
    socio: req.body.socio,
  };
  
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) { 
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const embarcaciones = await em.find(Embarcacion, {}, { populate: ['tipoEmbarcacion', 'socio'] }); 
    res.status(200).json({ message: 'found all embarcaciones', data: embarcaciones });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const embarcacion = await em.findOneOrFail(Embarcacion, { id }, { populate: ['tipoEmbarcacion', 'socio'] });
    res.status(200).json({ message: 'found embarcacion', data: embarcacion });
  } catch (error: any) {
    res.status(404).json({ message: 'Embarcación no encontrada' });
  }
}

async function add(req: Request, res: Response) {
  try {
    // Validar datos antes de crear la embarcación
    const embarcacionInstance = plainToInstance(Embarcacion, req.body.sanitizedInput);
    const errors = await validate(embarcacionInstance);

    if (errors.length > 0) {
      const messages = errors.map((err) => Object.values(err.constraints || {})).flat();
      return res.status(400).json({ message: 'Error de validación', errors: messages });
    }

    const embarcacion = em.create(Embarcacion, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Embarcacion created', data: embarcacion });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const embarcacionToUpdate = await em.findOneOrFail(Embarcacion, { id });

    // Validar datos nuevos
    const embarcacionInstance = plainToInstance(Embarcacion, req.body.sanitizedInput);
    const errors = await validate(embarcacionInstance, { skipMissingProperties: true });

    if (errors.length > 0) {
      const messages = errors.map((err) => Object.values(err.constraints || {})).flat();
      return res.status(400).json({ message: 'Error de validación', errors: messages });
    }

    em.assign(embarcacionToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Embarcacion updated', data: embarcacionToUpdate });
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ message: 'Embarcación no encontrada' });
    }
    res.status(500).json({ message: error.message });  
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const embarcacion = await em.findOneOrFail(Embarcacion, { id });
    await em.removeAndFlush(embarcacion);
    res.status(200).json({ message: 'Embarcacion removed' });    
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ message: 'Embarcación no encontrada' });
    }
    res.status(500).json({ message: error.message });
  }
}

async function findBySocio(req: Request, res: Response) {
  try {
    const idSocio = Number.parseInt(req.params.idSocio);
    const embarcaciones = await em.find(
      Embarcacion,
      { socio: idSocio },
      { populate: ['tipoEmbarcacion', 'socio'] }
    );

    res.status(200).json({ message: 'found embarcaciones by socio', data: embarcaciones });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findEmbarcacionesClub(req: Request, res: Response) {
  try {
    const embarcaciones = await em.find(Embarcacion, { socio: null }, { populate: ['tipoEmbarcacion'] });
    res.status(200).json({ message: 'found embarcaciones without socio', data: embarcaciones });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

export { sanitizeEmbarcacionInput, findAll, findOne, add, update, remove, findBySocio, findEmbarcacionesClub };
