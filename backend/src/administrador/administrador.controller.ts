import { Request, Response, NextFunction } from "express"
import { Administrador } from "./administrador.entity.js"
import { orm } from "../shared/orm.js"

const em = orm.em

/*function sanitizeAdministradorInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    email: req.body.email,
    id: req.body.id
  }
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}*/

async function findAll(req: Request, res: Response) {
  try{
    const administradores = await em.find(Administrador, {}); 
    res.status(200).json({message: 'found all embarcaciones', data: administradores});
  }catch (error:any) {
    res.status(500).send({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
      const id = Number.parseInt(req.params.id);
      const administrador = await em.findOneOrFail(Administrador, { id });
      res.status(200).json({message: 'found embarcacion', data: administrador});
    } catch (error: any) {
      res.status(500).send({ message: error.message });
      
    }
}

async function add(req: Request, res: Response) {
  try{
      const administrador = em.create(Administrador, req.body);
      await em.flush();
      res.status(201).json({message: 'Embarcacion created', data: administrador});
    }catch (error:any) {
      return res.status(500).send({ message: error.message });
    }
}

async function update(req: Request, res: Response) {
  try {
      const id = Number.parseInt(req.params.id);
      const administradorToUpdate = await em.findOneOrFail(Administrador, { id });
      em.assign(administradorToUpdate, req.body.sanitizedInput);
      em.flush();
      res.status(200).json({message: 'Embarcacion updated', data: administradorToUpdate});
    } catch (error: any) {
      return res.status(500).send({ message: error.message });  
    }
}

async function remove(req: Request, res: Response) {
  try {
      const id = Number.parseInt(req.params.id);
      const administrador = em.getReference(Administrador, id);
      await em.removeAndFlush(administrador);
      res.status(200).json({message: 'Administrador removed'});    
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
      }
}

export { findAll, findOne, add, update, remove }