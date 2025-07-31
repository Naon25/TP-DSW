import { Request, Response, NextFunction } from 'express';
import { tipoEmbarcacion } from './tipoEmbarcacion.entity.js';

function sanitizeTipoEmbarcacionInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    esloraMaxima: req.body.esloraMaxima,
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

export { sanitizeTipoEmbarcacionInput, findAll, findOne, add, update, remove };
