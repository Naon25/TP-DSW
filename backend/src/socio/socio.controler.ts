import { Request, Response, NextFunction } from 'express';
import { Socio } from './socio.entity.js';
import { orm } from '../shared/orm.js';

const em = orm.em;
em.getRepository(Socio);

function sanitizeSocioInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    dni: req.body.dni,
    email: req.body.email,
    telefono: req.body.telefono,
    password: req.body.password,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try{
      const socios = await em.find(Socio, {});
      res.status(200).json({message: 'found all socios', data: socios});
    }catch(error: any){
      res.status(500).json({message: error.message});
    }
}

async function findOne(req: Request, res: Response) {
  try{
      const id = Number.parseInt(req.params.id);
      const socio = await em.findOneOrFail(Socio, { id });
      res.status(200).json({message: 'found socio', data: socio});
    }catch(error: any){
      res.status(500).json({message: error.message});
}
}

async function add(req: Request, res: Response) {
   try{
      const newSocio = em.create(Socio, req.body);
      await em.flush();
      res.status(201).json({message: 'Socio created', data: newSocio});
    }catch(error: any){
      res.status(500).json({message: error.message});
    }
}

async function update(req: Request, res: Response) {
  try{
      const id = Number.parseInt(req.params.id);
      const socioToUpdate =  em.getReference(Socio,  id );
      em.assign(socioToUpdate, req.body);
      await em.flush();
      res.status(200).json({message: 'Socio updated'});  
    }catch(error: any){
      res.status(500).json({message: error.message});
    }
}

async function remove(req: Request, res: Response) {
  try{
      const id = Number.parseInt(req.params.id);
      const socioToRemove = em.getReference(Socio, id);
      await em.removeAndFlush(socioToRemove);
      res.status(200).json({message: 'Socio removed'});
    }catch(error: any){
      res.status(500).json({message: error.message});
    }
}

export { sanitizeSocioInput, findAll, findOne, add, update, remove };
