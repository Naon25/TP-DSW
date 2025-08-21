import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Embarcacion } from '../embarcacion/embarcacion.entity.js';
import { Afiliacion } from '../afiliacion/afiliacion.entity.js';
import { BaseEntity } from '../shared/baseEntity.entity.js';
@Entity()
export class Socio extends BaseEntity {
  @Property()
  nombre!: string;

  @Property()
  apellido!: string;

  @Property()
  dni!: string;

  @Property()
  email!: string;

  @Property()
  telefono!: string;

  @OneToMany(() => Embarcacion, (embarcacion) => embarcacion.socio)
  embarcaciones = new Collection<Embarcacion>(this);

  @OneToMany(() => Afiliacion, (afiliacion) => afiliacion.socio)
  afiliaciones = new Collection<Afiliacion>(this); 
}
