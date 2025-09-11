import {
  Entity,
  Property,
  ManyToOne,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Socio } from '../socio/socio.entity.js';

@Entity()
export class Afiliacion extends BaseEntity {


  @Property({nullable: false})
  fechaInicio!: Date;

  @Property({nullable: true}) // Cuando es null significa que la afiliacion esta activa
  fechaFin?: Date;

  @Property({nullable: false})
  tipo!: string;

  @ManyToOne(() => Socio, { nullable: false })
  socio!: Rel<Socio>;

}
