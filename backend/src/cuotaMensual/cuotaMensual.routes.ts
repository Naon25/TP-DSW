import { Router } from 'express';
import {sanitizeCuotaMensualInput, findAll, findOne, add, update, remove, findBySocio} from './cuotaMensual.controller.js';

export const cuotaMensualRouter = Router();

cuotaMensualRouter.get('/', findAll);
cuotaMensualRouter.get('/:id', findOne);
cuotaMensualRouter.post('/', sanitizeCuotaMensualInput, add);
cuotaMensualRouter.put('/:id', sanitizeCuotaMensualInput, update);
cuotaMensualRouter.delete('/:id', remove);
cuotaMensualRouter.get('/socio/:id', findBySocio);
