import { Router } from 'express';
import {  findAll, findOne, add, update, remove  } from './tipoEmbarcacion.controller.js';

export const tipoEmbarcacionRouter = Router()

tipoEmbarcacionRouter.get('/', findAll);
tipoEmbarcacionRouter.get('/:id', findOne);
tipoEmbarcacionRouter.post('/', add);
tipoEmbarcacionRouter.put('/:id', update);
tipoEmbarcacionRouter.delete('/:id', remove);