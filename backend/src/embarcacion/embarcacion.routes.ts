import { Router } from 'express';
import {
  sanitizeEmbarcacionInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  findBySocio,
  findEmbarcacionesClub
} from './embarcacion.controller.js';

export const embarcacionRouter = Router();

embarcacionRouter.get('/', findAll);
embarcacionRouter.get('/club', findEmbarcacionesClub);
embarcacionRouter.get('/:id', findOne);
embarcacionRouter.post('/', sanitizeEmbarcacionInput,add);
embarcacionRouter.put('/:id',sanitizeEmbarcacionInput, update);
embarcacionRouter.delete('/:id', remove);
embarcacionRouter.get('/socio/:idSocio', findBySocio);

