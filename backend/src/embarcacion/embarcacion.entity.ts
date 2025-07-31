import { Entity, PrimaryKey, Property, ManyToOne, Cascade  } from '@mikro-orm/core';
import type { tipoEmbarcacion } from '../tipoEmbarcacion/tipoEmbarcacion.entity.js';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import type { Socio } from '../socio/socio.entity.js';

@Entity()
export class Embarcacion extends BaseEntity {

  @Property({nullable: false})
  nombre!: string;

  @Property({nullable: false})
  matricula!: string;

  @Property({nullable: false})
  eslora!: number;

  @ManyToOne(() => 'tipoEmbarcacion', { nullable: false})
  tipoEmbarcacion!: tipoEmbarcacion;

  @ManyToOne(() => 'Socio', { nullable: false})
  socio!: Socio;
 
}
