/*import { Repository } from '../shared/repository.js'
import { Administrador } from './administrador.entity.js'

const administrador = [
  new Administrador(
    '1',
    'Raul',
    'Raul@gmail.com'),
];

export class AdministradorRepository implements Repository<Administrador>{
    public findAll(): Administrador[] | undefined {
      return administrador
    }
  
    public findOne(item: { id: string }): Administrador | undefined {
      return administrador.find((administrador) => administrador.id === item.id)
    }
  
    public add(item: Administrador): Administrador | undefined {
      administrador.push(item)
      return item
    }
  
    public update(item: Administrador): Administrador | undefined {
      const administradorIdx = administrador.findIndex((administrador) => administrador.id === item.id)
  
      if (administradorIdx !== -1) {
        administrador[administradorIdx] = { ...administrador[administradorIdx], ...item }
      }
      return administrador[administradorIdx]
    }
  
    public delete(item: { id: string }): Administrador | undefined {
      const administradorIdx = administrador.findIndex((administrador) => administrador.id === item.id)
  
      if (administradorIdx !== -1) {
        const deletedAdministrador = administrador[administradorIdx]
        administrador.splice(administradorIdx, 1)
        return deletedAdministrador
      }
    }
  }*/