/* Lo comento porque me hace conflicto con mi crud con bd*/
import { Router } from 'express'
import { findAll, findOne, add, update, remove } from './socio.controler.js'

export const socioRouter = Router()

socioRouter.get('/', findAll)
socioRouter.get('/:id', findOne)
socioRouter.post('/', add)
socioRouter.put('/:id', update)
socioRouter.delete('/:id', remove)
