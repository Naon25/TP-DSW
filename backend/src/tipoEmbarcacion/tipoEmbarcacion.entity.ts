import crypto from 'node:crypto';
import { Cascade, Collection, Entity, OneToMany, Property, } from '@mikro-orm/core';
import { Embarcacion } from '../embarcacion/embarcacion.entity.js';
import { BaseEntity } from '../shared/baseEntity.entity.js';
@Entity()
export class tipoEmbarcacion extends BaseEntity {

  @Property({nullable: false, unique: true})
  nombre!: string;

  @Property()
  esloraMaxima!: number;

  @OneToMany(() => Embarcacion, (embarcacion) => embarcacion.tipoEmbarcacion, {cascade: [Cascade.ALL]})
  embarcaciones = new Collection<Embarcacion>(this);

}