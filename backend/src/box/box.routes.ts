import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './box.controller.js';

export const boxRouter = Router();

boxRouter.get('/', findAll);
boxRouter.get('/:id', findOne);
boxRouter.post('/', add);
boxRouter.put('/:id', update);
boxRouter.delete('/:id', remove);
