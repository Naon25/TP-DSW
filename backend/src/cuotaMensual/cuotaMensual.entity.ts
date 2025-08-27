import {Entity, Property, ManyToOne, Rel,} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Socio } from '../socio/socio.entity.js';

@Entity()
export class CuotaMensual extends BaseEntity {

  @Property({ columnType: 'smallint' })
  mes!: number;

  @Property({ columnType: 'smallint' })
  anio!: number;

  @Property({nullable: false})
  monto!: number;

  @Property({ type: 'boolean', nullable: true }) //Null significa que no pagaron
  pagada?: boolean;

  @Property({nullable: true}) // Null significa que no pagaron
  fechaPago!: Date;

  @ManyToOne(() => Socio, { nullable: false })
  socio!: Rel<Socio>;

}