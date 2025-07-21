import { Repository } from '../shared/repository.js'
import { Administrador } from './administrador.entity.js'
import { pool } from '../shared/db/conn.mysql.js'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

export class AdministradorRepository implements Repository<Administrador>{
    public async findAll(): Promise<Administrador[] | undefined> {
      const [administrador] = await pool.query('SELECT * FROM administradores')
      return  administrador as Administrador[]
    }
  
    public async findOne(item: { id: string }): Promise<Administrador | undefined> {
      const id = Number.parseInt(item.id)
      const [admin] = await pool.query<RowDataPacket[]>('select * from administradores where id = ?', [id])
      if (admin.length === 0) {
        return undefined
      }
      const administrador = admin[0] as Administrador
      return administrador
    }
  
    public async add(administradorInput: Administrador): Promise<Administrador | undefined> {
       const { id, ...administradorRow } = administradorInput
       const [result] = await pool.query<ResultSetHeader>('insert into administradores set ?', [administradorRow])
       administradorInput.id = result.insertId
   
       return administradorInput
     }
  
    public async update(id: string, administradorInput: Administrador): Promise<Administrador | undefined> {
      const administradorId = Number.parseInt(id)
      const {...administradorRow } = administradorInput
      await pool.query('update administradores set ? where id = ?', [administradorRow, administradorId])

      return await this.findOne({ id })
    }
  
    public async delete(item: { id: string }): Promise<Administrador | undefined> {
      try {
        const administradorToDelete = await this.findOne(item)
        const administradorId = Number.parseInt(item.id)
        await pool.query('delete from administradores where id = ?', administradorId)
        return administradorToDelete
      } catch (error: any) {
        throw new Error('unable to delete administradores')
      }
    }
  }