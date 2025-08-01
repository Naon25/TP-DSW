//Lo comento porque me hace conflicto con mi crud con bd

import { Request, Response, NextFunction } from 'express';
import { Socio } from './socio.entity.js';

function sanitizeSocioInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    dni: req.body.dni,
    email: req.body.email,
    telefono: req.body.telefono,
  };
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  res.status(501).send({ message: 'Not implemented' });
}

async function findOne(req: Request, res: Response) {
  res.status(501).send({ message: 'Not implemented' });
}

async function add(req: Request, res: Response) {
  res.status(501).send({ message: 'Not implemented' });
}

async function update(req: Request, res: Response) {
  res.status(501).send({ message: 'Not implemented' });
}

async function remove(req: Request, res: Response) {
  res.status(501).send({ message: 'Not implemented' });
}

export { sanitizeSocioInput, findAll, findOne, add, update, remove };
