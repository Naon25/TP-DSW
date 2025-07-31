import { Request, Response, NextFunction } from 'express'
import { Amarra } from './amarra.entity.js'
import { Estado } from './amarra.entity.js'
import { AmarraRepository } from './amarra.respository.js';


const repository = new AmarraRepository()

function sanitizeAmarraInput(req: Request, res: Response, next: NextFunction) {
  const {estado, precioMensualBase, nroPilon, zona, longitudMax } = req.body;

  const sanitizedInput: any = {
    estado,
    precioMensualBase,
    zona,
    nroPilon, 
    longitudMax,
  };

  Object.keys(sanitizedInput).forEach((key) => {
    if (sanitizedInput[key] === undefined) {
      delete sanitizedInput[key];
    }
  });

  // Validación 
  const estadoValido: Estado[] = ['libre', 'ocupado'];
  if (sanitizedInput.estado && !estadoValido.includes(sanitizedInput.estado)) {
    return res.status(400).json({ error: `Estado inválido: ${sanitizedInput.estado}` });
  }

  if (sanitizedInput.precioMensual && typeof sanitizedInput.precioMensual !== 'number') {
    return res.status(400).json({ error: `precioMensual debe ser un número.` });
  }

  req.body.sanitizedInput = sanitizedInput;
  next();

}

async function findAll(req: Request, res: Response) {
  res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res: Response) {
  const id = req.params.id
  const amarra = await repository.findOne({ id })
  if (!amarra) {
    return res.status(404).send({ message: 'Amarra not found' })
  }
  res.json({ data: amarra })
}


async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
    const amarraInput = new Amarra(
        input.estado,
        input.longitudMax,
        input.precioMensualBase,
        input.zona,
        input.nroPilon
    )
  
  const amarra = await repository.add(amarraInput)
  return res.status(201).send({ message: 'Amarra created', data: amarra })
}


async function update(req: Request, res: Response) {
  const amarra = await repository.update(req.params.id, req.body.sanitizedInput)

  if (!amarra) {
    return res.status(404).send({ message: 'Amarra not found' })
  }

  return res.status(200).send({ message: 'Amarra updated successfully', data: amarra })
}

async function remove(req: Request, res: Response) {
  const id = req.params.id
  const amarra = await repository.delete({ id })

  if (!amarra) {
    res.status(404).send({ message: 'Amarra not found' })
  } else {
    res.status(200).send({ message: 'Amarra deleted successfully' })
  }
}

export { sanitizeAmarraInput, findAll, findOne, add, update, remove }