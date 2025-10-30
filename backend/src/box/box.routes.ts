import { Router } from 'express';
import { sanitizeBoxInput, findAll, findOne, add, update, remove } from './box.controller.js';

export const boxRouter = Router();

boxRouter.get('/', findAll);
boxRouter.get('/:id', findOne);
boxRouter.post('/', sanitizeBoxInput, add);
boxRouter.put('/:id', sanitizeBoxInput, update);
boxRouter.delete('/:id', remove);
