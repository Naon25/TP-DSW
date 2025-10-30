import { Router } from 'express'
import { findAll, findOne, add, update, remove } from './administrador.controller.js'

export const administradorRouter = Router()

administradorRouter.get('/', findAll)
administradorRouter.get('/:id', findOne)
administradorRouter.post('/', add)
administradorRouter.put('/:id', update)
administradorRouter.delete('/:id', remove)