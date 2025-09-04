import { Entity, Property, OneToMany, Collection, BeforeCreate } from '@mikro-orm/core';
import { Embarcacion } from '../embarcacion/embarcacion.entity.js';
import { Afiliacion } from '../afiliacion/afiliacion.entity.js';
import { CuotaMensual } from '../cuotaMensual/cuotaMensual.entity.js';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import bcrypt from 'bcrypt';
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

  @Property()
  password!: string;
  
  @OneToMany(() => Embarcacion, (embarcacion) => embarcacion.socio)
  embarcaciones = new Collection<Embarcacion>(this);

  @OneToMany(() => Afiliacion, (afiliacion) => afiliacion.socio)
  afiliaciones = new Collection<Afiliacion>(this); 

  @OneToMany(() => CuotaMensual, (cuotaMensual) => cuotaMensual.socio)
  cuotasMensuales = new Collection<Afiliacion>(this); 

  @BeforeCreate()
    async hashPassword() {
  if (this.dni) {
    const rawPassword = this.dni.slice(-6)
    this.password = await bcrypt.hash(rawPassword, 10)
  }
}
}