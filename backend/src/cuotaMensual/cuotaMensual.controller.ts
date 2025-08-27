import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/orm.js';
import { CuotaMensual } from './cuotaMensual.entity.js';

const em = orm.em;

function sanitizeCuotaMensualInput(req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput ={
    mes: req.body.mes,
    anio: req.body.anio,
    monto: req.body.monto,
    pagada: req.body.pagada,
    fechaPago: req.body.fechaPago,
    socio: req.body.socio,
  }
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) { 
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try{
    const cuotasMensuales = await em.find(CuotaMensual, {}, {populate: ['socio'] }); 
    res.status(200).json({message: 'found all cuotas mensuales', data: cuotasMensuales});
  }catch (error:any) {
    res.status(500).send({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const cuotaMensual = await em.findOneOrFail(CuotaMensual, { id }, {populate: ['socio'] });
    res.status(200).json({message: 'found cuota mensual', data: cuotaMensual});
  } catch (error: any) {
    res.status(500).send({ message: error.message });
    
  }
}

async function add(req: Request, res: Response) {
  try{
    const cuotaMensual = em.create(CuotaMensual, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({message: 'Cuota mensual created', data: cuotaMensual});
  }catch (error:any) {
    return res.status(400).send({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const cuotaMensualToUpdate = await em.findOneOrFail(CuotaMensual, { id });
    em.assign(cuotaMensualToUpdate, req.body.sanitizedInput);
    em.flush();
    res.status(200).json({message: 'Cuota mensual updated', data: cuotaMensualToUpdate});
  } catch (error: any) {
    return res.status(500).send({ message: error.message });  
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const cuotaMensual = em.getReference(CuotaMensual, id);
    await em.removeAndFlush(cuotaMensual);
    res.status(200).json({message: 'Cuota mensual removed'});    
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
    }
}

export { sanitizeCuotaMensualInput, findAll, findOne, add, update, remove };