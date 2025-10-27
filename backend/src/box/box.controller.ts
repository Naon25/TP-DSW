import { Request, Response } from 'express';
import { orm } from '../shared/orm.js';
import { Box } from './box.entity.js';

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
      error: error.message,
      stack: error.stack 
    });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const id = Number.parseInt(req.params.id);
    const box = await em.findOneOrFail(Box, { id });
    res.status(200).json({ message: 'found box', data: box });
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
    console.log('Creando nuevo box con datos:', req.body);
    const em = orm.em.fork();
    const newBox = em.create(Box, req.body);
    console.log('Box creado:', newBox);
    await em.persistAndFlush(newBox);
    console.log('Box guardado en la base de datos');
    res.status(201).json({ message: 'Box created', data: newBox });
  } catch (error: any) {
    console.error('Error al crear box:', error);
    res.status(500).json({ 
      message: 'Error al crear box',
      error: error.message,
      stack: error.stack 
    });
  }
}

async function update(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const id = Number.parseInt(req.params.id);
    const boxToUpdate = await em.findOneOrFail(Box, { id });
    em.assign(boxToUpdate, req.body);
    await em.persistAndFlush(boxToUpdate);
    res.status(200).json({ message: 'Box updated', data: boxToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const em = orm.em.fork();
    const id = Number.parseInt(req.params.id);
    const boxToRemove = await em.findOneOrFail(Box, { id });
    await em.removeAndFlush(boxToRemove);
    res.status(200).json({ message: 'Box removed' });
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      res.status(404).json({ message: 'Box no encontrado' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

export { findAll, findOne, add, update, remove };
