import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './embarcacion.controller.js';

export const embarcacionRouter = Router();

embarcacionRouter.get('/', findAll);
embarcacionRouter.get('/:id', findOne);
embarcacionRouter.post('/', add);
embarcacionRouter.put('/:id', update);
embarcacionRouter.delete('/:id', remove);
