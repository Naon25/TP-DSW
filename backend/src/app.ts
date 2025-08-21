import 'reflect-metadata'
import express from 'express'

/* Lo comento porque me hace conflicto con mi crud con bd*/
import { socioRouter } from './socio/socio.routes.js'
<<<<<<< HEAD
import { tipoEmbarcacionRouter } from './tipoEmbarcacion/tipoEmbarcacion.routes.js'
import { administradorRouter } from './administrador/administrador.routes.js'
=======
import { administradorRouter } from './administrador/administrador.routes.js';
import  { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core';
>>>>>>> admin

const app = express()
app.use(express.json())

<<<<<<< HEAD
=======
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})
>>>>>>> admin

app.use('/api/socios', socioRouter)
app.use('/api/tiposEmbarcacion', tipoEmbarcacionRouter)
app.use('/api/administrador', administradorRouter)

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

await syncSchema() 

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})



// 
