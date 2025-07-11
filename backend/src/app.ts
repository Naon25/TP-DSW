import express from 'express'
/* Lo comento porque me hace conflicto con mi crud con bd*/
// import { socioRouter } from './socio/socio.routes.js'
import { tipoEmbarcacionRouter } from './tipoEmbarcacion/tipoEmbarcacion.routes.js'

const app = express()
app.use(express.json())

//app.use('/api/socios', socioRouter)
app.use('/api/tiposEmbarcacion', tipoEmbarcacionRouter)

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})