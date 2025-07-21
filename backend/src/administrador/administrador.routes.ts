import { Router } from 'express'
import { sanitizeAdministradorInput, findAll, findOne, add, update, remove } from './administrador.controller.js'

export const administradorRouter = Router()

administradorRouter.get('/', findAll)
administradorRouter.get('/:id', findOne)
administradorRouter.post('/', sanitizeAdministradorInput, add)
administradorRouter.put('/:id', sanitizeAdministradorInput, update)
administradorRouter.patch('/:id', sanitizeAdministradorInput, update)
administradorRouter.delete('/:id', remove)