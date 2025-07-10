import { Repository } from '../shared/repository.js';
import { tipoEmbarcacion } from './tipoEmbarcacion.entity.js'; 

const tiposEmbarcacion = [
  new tipoEmbarcacion(
    'Velero',
    15,
    '4b3bc43f-a901-424a-ba61-7c2544639034'),
];

export class tipoEmbarcacionRepository implements Repository<tipoEmbarcacion>{
    public findAll(): tipoEmbarcacion[] | undefined {
      return tiposEmbarcacion
    }
  
    public findOne(item: { id: string }): tipoEmbarcacion | undefined {
      return tiposEmbarcacion.find((tipo) => tipo.id === item.id)
    }
  
    public add(item: tipoEmbarcacion): tipoEmbarcacion | undefined {
      tiposEmbarcacion.push(item)
      return item
    }
  
    public update(item: tipoEmbarcacion): tipoEmbarcacion | undefined {
      const tipoEmbarcacionIdx = tiposEmbarcacion.findIndex((tipoEmbarcacion) => tipoEmbarcacion.id === item.id)
  
      if (tipoEmbarcacionIdx !== -1) {
        tiposEmbarcacion[tipoEmbarcacionIdx] = { ...tiposEmbarcacion[tipoEmbarcacionIdx], ...item }
      }
      return tiposEmbarcacion[tipoEmbarcacionIdx]
    }
  
    public delete(item: { id: string }): tipoEmbarcacion | undefined {
      const tipoEmbarcacionIdx = tiposEmbarcacion.findIndex((tipoEmbarcacion) => tipoEmbarcacion.id === item.id)
  
      if (tipoEmbarcacionIdx !== -1) {
        const deletedtipoEmbarcacions = tiposEmbarcacion[tipoEmbarcacionIdx]
        tiposEmbarcacion.splice(tipoEmbarcacionIdx, 1)
        return deletedtipoEmbarcacions
      }
    }
  }