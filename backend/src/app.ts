import express from 'express'
import { socioRouter } from './socio/socio.routes.js'
<<<<<<< HEAD
import { administradorRouter } from './administrador/administrador.routes.js';
=======
import { tipoEmbarcacionRouter } from './tipoEmbarcacion/tipoEmbarcacion.routes.js'
>>>>>>> 1f49ef77ffea4b33678b6cb12abbc4c2cb54dbd1

const app = express()
app.use(express.json())

app.use('/api/socios', socioRouter)
<<<<<<< HEAD
app.use('/api/administrador', administradorRouter)
=======
app.use('/api/tiposEmbarcacion', tipoEmbarcacionRouter)
>>>>>>> 1f49ef77ffea4b33678b6cb12abbc4c2cb54dbd1

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})