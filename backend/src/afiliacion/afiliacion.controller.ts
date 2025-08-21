import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/orm.js';
import { Afiliacion } from './afiliacion.entity.js';

const em = orm.em;

function sanitizeAfiliacionInput(req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput ={
    fechaInicio: req.body.fechaInicio,
    fechaFin: req.body.fechaFin,
    tipo: req.body.tipo,
    socio: req.body.socio,
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
    const afiliaciones = await em.find(Afiliacion, {}, {populate: ['socio'] }); 
    res.status(200).json({message: 'found all afiliaciones', data: afiliaciones});
  }catch (error:any) {
    res.status(500).send({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const afiliacion = await em.findOneOrFail(Afiliacion, { id }, {populate: ['socio'] });
    res.status(200).json({message: 'found afiliacion', data: afiliacion});
  } catch (error: any) {
    res.status(500).send({ message: error.message });
    
  }
}

async function add(req: Request, res: Response) {
  try{
    const afiliacion = em.create(Afiliacion, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({message: 'Afiliacion created', data: afiliacion});
  }catch (error:any) {
    return res.status(400).send({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const afiliacionToUpdate = await em.findOneOrFail(Afiliacion, { id });
    em.assign(afiliacionToUpdate, req.body.sanitizedInput);
    em.flush();
    res.status(200).json({message: 'Afiliacion updated', data: afiliacionToUpdate});
  } catch (error: any) {
    return res.status(500).send({ message: error.message });  
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const afiliacion = em.getReference(Afiliacion, id);
    await em.removeAndFlush(afiliacion);
    res.status(200).json({message: 'Afiliacion removed'});    
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
    }
}

export { sanitizeAfiliacionInput, findAll, findOne, add, update, remove };

