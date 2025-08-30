import { Router } from 'express';
import {sanitizeCuotaMensualInput, findAll, findOne, add, update, remove, findImpagasPorSocio,} from './cuotaMensual.controller.js';

export const cuotaMensualRouter = Router();

cuotaMensualRouter.get('/impagas/:idSocio', findImpagasPorSocio);
cuotaMensualRouter.get('/', findAll);
cuotaMensualRouter.get('/:id', findOne);
cuotaMensualRouter.post('/', sanitizeCuotaMensualInput, add);
cuotaMensualRouter.put('/:id', sanitizeCuotaMensualInput, update);
cuotaMensualRouter.delete('/:id', remove);
