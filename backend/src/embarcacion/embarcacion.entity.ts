import { Entity, PrimaryKey, Property, ManyToOne, Cascade, Rel,  } from '@mikro-orm/core';
import { TipoEmbarcacion } from '../tipoEmbarcacion/tipoEmbarcacion.entity.js';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Socio } from '../socio/socio.entity.js';

@Entity()
export class Embarcacion extends BaseEntity {

  @Property({nullable: false})
  nombre!: string;

  @Property({nullable: false})
  matricula!: string;

  @Property({nullable: false})
  eslora!: number;

  @ManyToOne(() => TipoEmbarcacion, { nullable: false})
  tipoEmbarcacion!: TipoEmbarcacion;

  @ManyToOne(() => Socio, { nullable: false})
  socio!: Rel<Socio>;
 
}
