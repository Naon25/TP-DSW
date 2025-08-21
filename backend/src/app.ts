import 'reflect-metadata'
import express from 'express'
import { socioRouter } from './socio/socio.routes.js'
import { administradorRouter } from './administrador/administrador.routes.js';
import  { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core';

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

app.use('/api/socios', socioRouter)
app.use('/api/administrador', administradorRouter)

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

await syncSchema() 

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})