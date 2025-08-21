import 'reflect-metadata'
import express from 'express'
import { socioRouter } from './socio/socio.routes.js'
<<<<<<< HEAD
import { tipoEmbarcacionRouter } from './tipoEmbarcacion/tipoEmbarcacion.routes.js'
import { administradorRouter } from './administrador/administrador.routes.js'
<<<<<<< HEAD
=======
import { administradorRouter } from './administrador/administrador.routes.js';
import  { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core';
>>>>>>> admin
=======
import { embarcacionRouter } from './embarcacion/embarcacion.routes.js'
import { boxRouter } from './box/box.routes.js'
import { amarraRouter } from './amarra/amarra.routes.js'
import { afiliacionRouter } from './afiliacion/afiliacion.routes.js'
import {orm, syncSchema} from './shared/orm.js'
import { RequestContext } from '@mikro-orm/mysql'
import cors from 'cors';
>>>>>>> ec1260dfa247cca291c06ef0967bf2aee0387af3

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto al origen de tu frontend
}));
app.use(express.json())

<<<<<<< HEAD
=======
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})
>>>>>>> admin

app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

app.use('/api/socios', socioRouter)
app.use('/api/tiposEmbarcacion', tipoEmbarcacionRouter)
app.use('/api/embarcaciones', embarcacionRouter) 
app.use('/api/administradores', administradorRouter)
app.use('/api/boxes', boxRouter)
app.use('/api/amarras', amarraRouter)
app.use('/api/afiliaciones', afiliacionRouter)

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

<<<<<<< HEAD
await syncSchema() 
=======
await syncSchema()  //Nunca llamar a esto en producción, solo para desarrollo
>>>>>>> ec1260dfa247cca291c06ef0967bf2aee0387af3

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})


