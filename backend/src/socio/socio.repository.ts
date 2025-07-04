import { Repository } from '../shared/repository.js'
import { Socio } from './socio.entity.js'

const socios = [
  new Socio(
    'Maradona',
    '11111111',
    'd10s@hotmail.com',
    '3412092834',
    '85659cc4-c917-40f9-a30f-f3c321f303c5'
  ),
]

export class SocioRepository implements Repository<Socio> {
  public findAll(): Socio[] | undefined {
    return socios
  }

  public findOne(item: { id: string }): Socio | undefined {
    return socios.find((socio) => socio.id === item.id)
  }

  public add(item: Socio): Socio | undefined {
    socios.push(item)
    return item
  }

  public update(item: Socio): Socio | undefined {
    const socioIdx = socios.findIndex((socio) => socio.id === item.id)

    if (socioIdx !== -1) {
      socios[socioIdx] = { ...socios[socioIdx], ...item }
    }
    return socios[socioIdx]
  }

  public delete(item: { id: string }): Socio | undefined {
    const socioIdx = socios.findIndex((socio) => socio.id === item.id)

    if (socioIdx !== -1) {
      const deletedSocios = socios[socioIdx]
      socios.splice(socioIdx, 1)
      return deletedSocios
    }
  }
}