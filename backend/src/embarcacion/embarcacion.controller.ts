import { Request, Response, NextFunction } from 'express';
import { Embarcacion } from './embarcacion.entity.js'; 
import { orm } from '../shared/orm.js'; 

const em = orm.em;

function sanitizeEmbarcacionInput(req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput ={
    nombre: req.body.nombre,
    matricula: req.body.matricula,
    eslora: req.body.eslora,
  }
  //mas validaciones si es necesario
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) { 
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try{
    const embarcaciones = await em.find(Embarcacion, {}, {populate: ['tipoEmbarcacion', 'socio'] });
    res.status(200).json({message: 'found all embarcaciones', data: embarcaciones});
  }catch (error:any) {
    res.status(500).send({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  res.status(501).send({ message: 'Not implemented' });
}

async function add(req: Request, res: Response) {
  try{
    const embarcacion = em.create(Embarcacion, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({message: 'Embarcacion created', data: embarcacion});
  }catch (error:any) {
    return res.status(400).send({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  res.status(501).send({ message: 'Not implemented' });
}

async function remove(req: Request, res: Response) {
  res.status(501).send({ message: 'Not implemented' });
}

export {  findAll, findOne, add, update, remove };