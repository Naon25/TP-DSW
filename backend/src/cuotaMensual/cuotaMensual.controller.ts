import { Request, Response, NextFunction } from 'express';
import { orm } from '../shared/orm.js';
import { CuotaMensual } from './cuotaMensual.entity.js';

const em = orm.em;

function sanitizeCuotaMensualInput(req: Request, res: Response, next: NextFunction) {
  const body = req.body || {};
  const input: any = {};

  if (body.monto !== undefined && body.monto !== null && body.monto !== '') {
    input.monto = Number(body.monto);
  }

  if (body.fechaVencimiento) {
    input.fechaVencimiento = new Date(body.fechaVencimiento); // validar en handler si hace falta
  }

  if (body.fechaPago) {
    input.fechaPago = new Date(body.fechaPago);
  }

  if (body.pagada !== undefined) {
    input.pagada = body.pagada === true || body.pagada === 'true';
  }

  if (body.socio !== undefined && body.socio !== null && body.socio !== '') {
    input.socio = Number(body.socio); // dejo solo el id numérico aquí
  }

  req.body.sanitizedInput = input;
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
  try {
    const cuotaMensual = em.create(CuotaMensual, req.body.sanitizedInput);

    await em.persistAndFlush(cuotaMensual);

    res.status(201).json({ message: 'Cuota mensual created', data: cuotaMensual });
  } catch (error: any) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const cuotaMensualToUpdate = await em.findOneOrFail(CuotaMensual, { id });

    em.assign(cuotaMensualToUpdate, req.body.sanitizedInput);

    await em.persistAndFlush(cuotaMensualToUpdate); 

    res.status(200).json({ message: 'Cuota mensual updated', data: cuotaMensualToUpdate });
  } catch (error: any) {
    console.error(error);
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

async function findBySocio(req: Request, res: Response) {
  try {
    const idSocio = Number.parseInt(req.params.id);
    const cuotas = await em.find(CuotaMensual, { socio: idSocio }, { populate: ['socio'] });
    res.status(200).json({ message: 'Cuotas del socio encontradas', data: cuotas });
  } catch (error: any) {
    console.error('❌ Error en findBySocio:', error);
    res.status(500).send({ message: error.message });
  }
}


export { sanitizeCuotaMensualInput, findAll, findOne, add, update, remove, findBySocio };