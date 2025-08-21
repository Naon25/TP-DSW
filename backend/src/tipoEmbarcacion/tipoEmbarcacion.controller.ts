import { Request, Response } from 'express';
import { orm } from '../shared/orm.js';
import { TipoEmbarcacion } from './tipoEmbarcacion.entity.js';

const em = orm.em
em.getRepository(TipoEmbarcacion)
async function findAll(req: Request, res: Response) {
  try{
    const tiposEmbarcacion = await em.find(TipoEmbarcacion, {});
    res.status(200).json({message: 'found all tiposEmbarcacion', data: tiposEmbarcacion});
  }catch(error: any){
    res.status(500).json({message: error.message});
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id);
    const tipoEmbarcacionFound = await em.findOneOrFail(TipoEmbarcacion, { id });
    res.status(200).json({message: 'found tipoEmbarcacion', data: tipoEmbarcacionFound});
  }catch(error: any){
    res.status(500).json({message: error.message});
  }
}

async function add(req: Request, res: Response) {
  try{
    const newTipoEmbarcacion = em.create(TipoEmbarcacion, req.body);
    await em.flush();
    res.status(201).json({message: 'TipoEmbarcacion created', data: newTipoEmbarcacion});
  }catch(error: any){
    res.status(500).json({message: error.message});
  }
}

async function update(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id);
    const tipoEmbarcacionToUpdate =  em.getReference(TipoEmbarcacion,  id );
    em.assign(tipoEmbarcacionToUpdate, req.body);
    await em.flush();
    res.status(200).json({message: 'TipoEmbarcacion updated'});  
  }catch(error: any){
    res.status(500).json({message: error.message});
  }
}

async function remove(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id);
    const tipoEmbarcacionToRemove = em.getReference(TipoEmbarcacion, id);
    await em.removeAndFlush(tipoEmbarcacionToRemove);
    res.status(200).json({message: 'TipoEmbarcacion removed'});
  }catch(error: any){
    res.status(500).json({message: error.message});
  }
}

export {  findAll, findOne, add, update, remove };
