import express from 'express'
import { socioRouter } from './socio/socio.routes.js'

const app = express()
app.use(express.json())

app.use('/api/socios', socioRouter)

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})