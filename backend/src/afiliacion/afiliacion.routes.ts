import { Router } from 'express';
import {
  sanitizeAfiliacionInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './afiliacion.controller.js';

export const afiliacionRouter = Router();

afiliacionRouter.get('/', findAll);
afiliacionRouter.get('/:id', findOne);
afiliacionRouter.post('/', sanitizeAfiliacionInput, add);
afiliacionRouter.put('/:id', sanitizeAfiliacionInput, update);
afiliacionRouter.delete('/:id', remove);




