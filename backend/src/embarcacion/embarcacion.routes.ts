import { Router } from 'express';
import {
  sanitizeEmbarcacionInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './embarcacion.controller.js';

export const embarcacionRouter = Router();

embarcacionRouter.get('/', findAll);
embarcacionRouter.get('/:id', findOne);
embarcacionRouter.post('/', sanitizeEmbarcacionInput,add);
embarcacionRouter.put('/:id',sanitizeEmbarcacionInput, update);
embarcacionRouter.delete('/:id', remove);
