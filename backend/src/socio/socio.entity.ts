import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Embarcacion } from '../embarcacion/embarcacion.entity.js';

@Entity()
export class Socio {
  @PrimaryKey()
  id!: number;

  @Property()
  nombre!: string;

  @Property()
  dni!: string;

  @Property()
  email!: string;

  @Property()
  telefono!: string;

  @OneToMany(() => Embarcacion, (embarcacion) => embarcacion.socio)
  embarcaciones = new Collection<Embarcacion>(this);
}
