import { Entity, PrimaryKey, Property, OneToMany, Collection, BeforeCreate } from '@mikro-orm/core';
import { Embarcacion } from '../embarcacion/embarcacion.entity.js';
import { Afiliacion } from '../afiliacion/afiliacion.entity.js';
import { CuotaMensual } from '../cuotaMensual/cuotaMensual.entity.js';
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

  @Property()
  password!: string;
  
  @OneToMany(() => Embarcacion, (embarcacion) => embarcacion.socio)
  embarcaciones = new Collection<Embarcacion>(this);

  @OneToMany(() => Afiliacion, (afiliacion) => afiliacion.socio)
  afiliaciones = new Collection<Afiliacion>(this); 

  @OneToMany(() => CuotaMensual, (cuotaMensual) => cuotaMensual.socio)
  cuotasMensuales = new Collection<Afiliacion>(this); 

  @BeforeCreate()
  setPasswordFromDni() {
    if (this.dni) {
      this.password = this.dni.slice(-6); // últimos 6 dígitos del dni
    }
  }
}