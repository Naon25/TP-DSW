//Lo comento porque me hace conflicto con mi crud con bd

import { Request, Response, NextFunction } from 'express'
import { SocioRepository } from './socio.repository.js'
import { Socio } from './socio.entity.js'

const repository = new SocioRepository()

function sanitizeSocioInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    dni: req.body.dni,
    email: req.body.email,
    telefono: req.body.telefono,
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
  const socio = await repository.findOne({ id })
  if (!socio) {
    return res.status(404).send({ message: 'Socio not found' })
  }
  res.json({ data: socio })
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const socioInput = new Socio(
    input.nombre, 
    input.dni, 
    input.email, 
    input.telefono,
  )

  const socio = await repository.add(socioInput)
  return res.status(201).send({ message: 'Socio created', data: socio })
}

async function update(req: Request, res: Response) {
  const socio = await repository.update(req.params.id, req.body.sanitizedInput)

  if (!socio) {
    return res.status(404).send({ message: 'Socio not found' })
  }

  return res.status(200).send({ message: 'Socio updated successfully', data: socio })
}

async function remove(req: Request, res: Response) {
  const id = req.params.id
  const socio = await repository.delete({ id })

  if (!socio) {
    res.status(404).send({ message: 'Socio not found' })
  } else {
    res.status(200).send({ message: 'Socio deleted successfully' })
  }
}

export { sanitizeSocioInput, findAll, findOne, add, update, remove }

