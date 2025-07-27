import { Repository } from '../shared/repository.js'
import { Amarra} from './amarra.entity.js'
import { pool } from '../shared/db/conn.mysql.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class AmarraRepository implements Repository<Amarra> {
    public async findAll(): Promise<Amarra[] | undefined> {
      const [amarra] = await pool.query('select * from amarra');
      return amarra as Amarra[];
    }

    public async findOne(item: { id: string }): Promise<Amarra | undefined> {
        const id = Number.parseInt(item.id)
        const [amarra] = await pool.query<RowDataPacket[]>('select * from amarra where id = ?', [id])
        if (amarra.length === 0) {
          return undefined
        }
        const amar = amarra[0] as Amarra
        return amar
    }

      
    public async add(amarraInput: Amarra): Promise<Amarra | undefined> {
        const { id, ...amarraRow } = amarraInput
        const [result] = await pool.query<ResultSetHeader>('insert into amarra set ?', [amarraRow])
        amarraInput.id = result.insertId
      
        return amarraInput
    }

    public async update(id: string, amarraInput: Amarra): Promise<Amarra | undefined> {
        const amarraId = Number.parseInt(id)
        const {...amarraRow } = amarraInput
        await pool.query('update amarra set ? where id = ?', [amarraRow, amarraId])
    
        return await this.findOne({ id })
    }

    public async delete(item: { id: string }): Promise<Amarra | undefined> {
        try {
          const amarraToDelete = await this.findOne(item)
          const amarraId = Number.parseInt(item.id)
          await pool.query('delete from amarra where id = ?', amarraId)
          return amarraToDelete
        } catch (error: any) {
          throw new Error('unable to delete amarra')
        }
    }

}