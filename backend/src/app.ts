import express, { NextFunction, Request, Response } from 'express'
import { Socio } from './socio.js'

const app = express()
app.use(express.json())

//Socios pre-cargados

const socios = [
  new Socio(
    'Maradona',
    '11111111',
    'd10s@hotmail.com',
    '3412092834',
    '85659cc4-c917-40f9-a30f-f3c321f303c5'
  ),
]




function sanitizeSocioInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    dni: req.body.dni,
    email: req.body.email,
    telefono: req.body.telefono
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

//Read

app.get('/api/socios',(req, res) =>{
  res.json({data: socios})
})


app.get('/api/socios/:id',(req, res) => {
  const socio = socios.find((socio) => socio.id === req.params.id)
  if (!socio) {
  return res.status(404).send({ message: 'Socio not found' })
  }
  res.json({data: socio})
})

//Create

app.post('/api/socios',sanitizeSocioInput,(req,res)=>{
  const input = req.body.sanitizedInput
  const socio = new Socio (
    input.nombre, 
    input.dni, 
    input.email, 
    input.telefono)
  socios.push(socio)
  return res.status(201).send({message: 'Socio created', data: socio})
})

//Update

app.put('/api/socios/:id', sanitizeSocioInput, (req,res)=>{
  const socioIndex = socios.findIndex((socio)=>socio.id === req.params.id)
  if(socioIndex === -1){
    return res.status(404).send({ message: 'Socio not found' })
  }
  socios[socioIndex] = {...socios[socioIndex], ...req.body.sanitizedInput }
  return res.status(200).send({message: 'Socio updated Successfully', data: socios[socioIndex]})
})


app.patch('/api/socios/:id', sanitizeSocioInput, (req,res)=>{
  const socioIndex = socios.findIndex((socio)=>socio.id === req.params.id)
  if(socioIndex === -1){
    return res.status(404).send({ message: 'Socio not found' })
  }
  socios[socioIndex] = {...socios[socioIndex], ...req.body.sanitizedInput }
  return res.status(200).send({message: 'Socio updated Successfully', data: socios[socioIndex]})
})

//Delete

app.delete('/api/socios/:id',(req,res)=>{
  const socioIndex = socios.findIndex((socio) => socio.id === req.params.id)

  if (socioIndex === -1) {
    res.status(404).send({ message: 'Socio not found' })
  } else {
    socios.splice(socioIndex, 1)
    res.status(200).send({ message: 'Socio deleted successfully' })
  }
})





app.use((_, res) => {
   return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})