import { Request, Response } from 'express'
import { Amarra } from './amarra.entity.js'
import { orm } from '../shared/orm.js';


const em = orm.em
em.getRepository(Amarra)


async function findAll(req: Request, res: Response) {
  try {
    const { zona, estado } = req.query;
    const where: any = {};
    
    if (zona) {
      where.zona = zona.toString();
    }
    if (estado) {
      where.estado = estado.toString();
    }
    
    const amarras = await em.find(Amarra, where);
    res.status(200).json({
      message: Object.keys(where).length > 0 ? `Amarras filtradas por ${Object.keys(where).join(' y ')}` : 'Todas las amarras',
      data: amarras
    });
    
  } catch (error: any) {
    console.error('Error al buscar amarras:', error);
    res.status(500).json({
      message: 'Error al buscar amarras',
      error: error.message
    });
  }
}

async function findOne(req: Request, res: Response) {
 try{
  const id = Number.parseInt(req.params.id)
  const amarra = await em.findOneOrFail(Amarra, { id })
        res.status(200).json({message: 'found amarra', data: amarra})
      }catch(error: any){
        res.status(500).json({message: error.message})
  }
}


async function add(req: Request, res: Response) {
   try{
    const amarra = em.create(Amarra, req.body)
    await em.flush()
    res.status(201).json({ message: 'Amarra created', data: amarra })
  } catch(error: any){
    res.status(500).json ({message: error.message})
  }
}


async function update(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const amarraToUpdate =  em.getReference(Amarra,  id )
    em.assign(amarraToUpdate, req.body)
    await em.flush();
    res.status(200).send({ message: 'Amarra updated successfully'})  
    }catch(error: any){
      res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const amarraToRemove = em.getReference(Amarra, id)
    await em.removeAndFlush(amarraToRemove)
    res.status(200).json({message: 'Amarra removed'})
    }catch(error: any){
      res.status(500).json({message: error.message})
    }
}

export {findAll, findOne, add, update, remove }