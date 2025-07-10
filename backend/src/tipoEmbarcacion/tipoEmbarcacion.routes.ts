import { Router } from 'express';
import { sanitizeTipoEmbarcacionInput, findAll, findOne, add, update, remove  } from './tipoEmbarcacion.controller.js';

export const tipoEmbarcacionRouter = Router()

tipoEmbarcacionRouter.get('/', findAll);
tipoEmbarcacionRouter.get('/:id', findOne);
tipoEmbarcacionRouter.post('/', sanitizeTipoEmbarcacionInput, add);
tipoEmbarcacionRouter.put('/:id', sanitizeTipoEmbarcacionInput, update);
tipoEmbarcacionRouter.patch('/:id', sanitizeTipoEmbarcacionInput, update);
tipoEmbarcacionRouter.delete('/:id', remove);