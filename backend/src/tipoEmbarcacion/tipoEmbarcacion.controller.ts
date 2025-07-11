import { Request, Response, NextFunction } from "express";
import { tipoEmbarcacionRepository } from "./tipoEmbarcacion.repository.js";
import { tipoEmbarcacion } from "./tipoEmbarcacion.entity.js";

const repository = new tipoEmbarcacionRepository

function sanitizeTipoEmbarcacionInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    esloraMaxima: req.body.esloraMaxima
  }
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response) {
  const id = req.params.id
  const tipoEmb = repository.findOne({ id })
  if (!tipoEmb) {
    return res.status(404).send({ message: 'Socio not found' })
  }
  res.json({ data: tipoEmb })
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const tipoEmbarcacionInput = new tipoEmbarcacion(
    input.nombre, 
    input.esloraMaxima
  )

  const tipoEmb = repository.add(tipoEmbarcacionInput)
  return res.status(201).send({ message: 'TipoEmbarcacion created', data: tipoEmb })
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id
  const tipoEmb = repository.update(req.body.sanitizedInput)

  if (!tipoEmb) {
    return res.status(404).send({ message: 'TipoEmbarcacion not found' })
  }

  return res.status(200).send({ message: 'TipoEmbarcacion updated successfully', data: tipoEmb })
}

function remove(req: Request, res: Response) {
  const id = req.params.id
  const tipoEmb = repository.delete({ id })

  if (!tipoEmb) {
    res.status(404).send({ message: 'TipoEmbarcacion not found' })
  } else {
    res.status(200).send({ message: 'TipoEmbarcacion deleted successfully' })
  }
}

export { sanitizeTipoEmbarcacionInput, findAll, findOne, add, update, remove }