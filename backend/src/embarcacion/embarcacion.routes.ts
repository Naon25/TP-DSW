import { Router } from 'express';
import {
  sanitizeEmbarcacionInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  findBySocio,
  findEmbarcacionesClub,
} from './embarcacion.controller.js';

export const embarcacionRouter = Router();


embarcacionRouter.get('/club', findEmbarcacionesClub);
embarcacionRouter.get('/socio/:idSocio', findBySocio);
embarcacionRouter.get('/', findAll);
embarcacionRouter.get('/:id', findOne);
embarcacionRouter.post('/', sanitizeEmbarcacionInput, add);
embarcacionRouter.put('/:id', sanitizeEmbarcacionInput, update);
embarcacionRouter.delete('/:id', remove);
