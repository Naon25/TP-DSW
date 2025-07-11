import { Request, Response, NextFunction } from "express"
import { AdministradorRepository } from "./administrador.repository.js"
import { Administrador } from "./administrador.entity.js"

const repository = new AdministradorRepository()

function sanitizeAdministradorInput(req: Request, res: Response, next: NextFunction) {
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
}

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response) {
  const id = req.params.id
  const admin = repository.findOne({ id })
  if (!admin) {
    return res.status(404).send({ message: 'Administrador not found' })
  }
  res.json({ data: admin })
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput

  const adminsitradorImput = new Administrador(
    input.id,
    input.nombre, 
    input.email
  )

  const admin = repository.add(adminsitradorImput)
  return res.status(201).send({ message: 'Administrador created', data: admin })
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id
  const admin = repository.update(req.body.sanitizedInput)

  if (!admin) {
    return res.status(404).send({ message: 'Administrador not found' })
  }

  return res.status(200).send({ message: 'Administrador updated successfully', data: admin })
}

function remove(req: Request, res: Response) {
  const id = req.params.id
  const admin = repository.delete({ id })

  if (!admin) {
    res.status(404).send({ message: 'Administrador not found' })
  } else {
    res.status(200).send({ message: 'Administrador deleted successfully' })
  }
}

export { sanitizeAdministradorInput, findAll, findOne, add, update, remove }