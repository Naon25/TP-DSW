import { Repository } from '../shared/repository.js';
import { tipoEmbarcacion } from './tipoEmbarcacion.entity.js'; 
import { pool } from '../shared/db/conn.mysql.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

/*const tiposEmbarcacion = [
  new tipoEmbarcacion(
    'Velero',
    15,
    '4b3bc43f-a901-424a-ba61-7c2544639034'),
];*/

export class tipoEmbarcacionRepository implements Repository<tipoEmbarcacion>{
    public async findAll(): Promise<tipoEmbarcacion[] | undefined> {
      const [tiposEmbarcacion] = await pool.query('select * from tiposEmbarcacion');
      return tiposEmbarcacion as tipoEmbarcacion[];
    }
  
    public async findOne(item: { id: string }): Promise<tipoEmbarcacion | undefined> {
      const id = Number.parseInt(item.id)
      const [tiposEmbarcacion] = await pool.query<RowDataPacket[]>('select * from tiposEmbarcacion where id = ?', [id])
      if (tiposEmbarcacion.length === 0) {
        return undefined
      }
      const tipoEmbarcacion = tiposEmbarcacion[0] as tipoEmbarcacion
      return tipoEmbarcacion
  }
    
  
    public async add(tipoEmbarcacionInput: tipoEmbarcacion): Promise<tipoEmbarcacion | undefined> {
      const { id, ...tipoEmbarcacionRow } = tipoEmbarcacionInput;
      const [result] = await pool.query<ResultSetHeader>('insert into tiposEmbarcacion set ?',[tipoEmbarcacionRow]);
      tipoEmbarcacionInput.id = result.insertId;
      return tipoEmbarcacionInput;
    }
  
    public async update(id: string, tipoEmbarcacionInput: tipoEmbarcacion): Promise<tipoEmbarcacion | undefined> {  
      const tipoEmbarcacionId = Number.parseInt(id);
      const { ...tipoEmbarcacionRow } = tipoEmbarcacionInput;
      await pool.query('update tiposEmbarcacion set ? where id = ?', [tipoEmbarcacionRow, tipoEmbarcacionId]);
      return await this.findOne({ id });

    }
  
    public async delete(item: { id: string }): Promise<tipoEmbarcacion | undefined> {
  
      try {
        const tipoEmbarcacionToDelete = await this.findOne(item);
        const tipoEmbarcacionId = Number.parseInt(item.id);
        await pool.query('delete from tiposEmbarcacion where id = ?', tipoEmbarcacionId);
        return tipoEmbarcacionToDelete;
      } catch (error: any) {
        throw new Error('unable to delete tipoEmbarcacion');
      }

    }
  }