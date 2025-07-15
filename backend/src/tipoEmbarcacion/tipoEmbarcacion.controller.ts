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

async function findAll(req: Request, res: Response) {
  res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res: Response) {
  const id = req.params.id
  const tipoEmb = await repository.findOne({ id })
  if (!tipoEmb) {
    return res.status(404).send({ message: 'tipoEmbarcacion not found' })
  }
  res.json({ data: tipoEmb })
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const tipoEmbarcacionInput = new tipoEmbarcacion(
    input.nombre, 
    input.esloraMaxima
  )

  const tipoEmb = await repository.add(tipoEmbarcacionInput)
  return res.status(201).send({ message: 'TipoEmbarcacion created', data: tipoEmb })
}

async function update(req: Request, res: Response) {
  const tipoEmb = await repository.update(req.params.id, req.body.sanitizedInput)

  if (!tipoEmb) {
    return res.status(404).send({ message: 'TipoEmbarcacion not found' })
  }

  return res.status(200).send({ message: 'TipoEmbarcacion updated successfully', data: tipoEmb })
}

async function remove(req: Request, res: Response) {
  const id = req.params.id
  const tipoEmb = await repository.delete({ id })

  if (!tipoEmb) {
    res.status(404).send({ message: 'TipoEmbarcacion not found' })
  } else {
    res.status(200).send({ message: 'TipoEmbarcacion deleted successfully' })
  }
}

export { sanitizeTipoEmbarcacionInput, findAll, findOne, add, update, remove }