// Lo comento porque me hace conflicto con mi crud con bd

import { Repository } from '../shared/repository.js'
import { Socio } from './socio.entity.js'
import { pool } from '../shared/db/conn.mysql.js'
import { ResultSetHeader, RowDataPacket } from 'mysql2'




export class SocioRepository implements Repository<Socio> {
  public async findAll(): Promise<Socio[] | undefined> {
    const [socios] = await pool.query('select * from socios')
    return socios as Socio[]
  }




  public async findOne(item: { id: string }): Promise<Socio | undefined> {
    const id = Number.parseInt(item.id)
    const [socios] = await pool.query<RowDataPacket[]>('select * from socios where id = ?', [id])
    if (socios.length === 0) {
      return undefined
    }
    const socio = socios[0] as Socio
    return socio
  }




  public async add(socioInput: Socio): Promise<Socio | undefined> {
    const { id, ...socioRow } = socioInput
    const [result] = await pool.query<ResultSetHeader>('insert into socios set ?', [socioRow])
    socioInput.id = result.insertId

    return socioInput
  }




  public async update(id: string, socioInput: Socio): Promise<Socio | undefined> {
    const socioId = Number.parseInt(id)
    const {...socioRow } = socioInput
    await pool.query('update socios set ? where id = ?', [socioRow, socioId])

    return await this.findOne({ id })
  }




  public async delete(item: { id: string }): Promise<Socio | undefined> {
    try {
      const socioToDelete = await this.findOne(item)
      const socioId = Number.parseInt(item.id)
      await pool.query('delete from socios where id = ?', socioId)
      return socioToDelete
    } catch (error: any) {
      throw new Error('unable to delete socio')
    }
  }
}

