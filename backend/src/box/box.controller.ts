import { Request, Response } from 'express';
import { orm } from '../shared/orm.js';
import { Box } from './box.entity.js';

const em = orm.em;
em.getRepository(Box)
async function findAll(req: Request, res: Response) {
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
    console.error('Error al buscar boxes:', error);
    res.status(500).json({ 
      message: 'Error al buscar boxes',
      error: error.message 
    });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const box = await em.findOneOrFail(Box, { id });
    res.status(200).json({ message: 'found box', data: box });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const newBox = em.create(Box, req.body);
    await em.flush();
    res.status(201).json({ message: 'Box created', data: newBox });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const boxToUpdate = em.getReference(Box, id);
    em.assign(boxToUpdate, req.body);
    await em.flush();
    res.status(200).json({ message: 'Box updated' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const boxToRemove = em.getReference(Box, id);
    await em.removeAndFlush(boxToRemove);
    res.status(200).json({ message: 'Box removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove };
