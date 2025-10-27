import { BaseEntity } from '../shared/baseEntity.entity.js';
import {
  Entity,
  Property,
  PrimaryKey,
  Enum,
} from '@mikro-orm/core';


export enum Estado {
  DISPONIBLE = 'disponible',
  OCUPADO = 'ocupado',
  MANTENIMIENTO = 'mantenimiento'
}

 @Entity()
  export class Box extends BaseEntity {

  @PrimaryKey()
    id?: number
      
  @Enum(() => Estado)
  estado!: Estado

  @Property()
  nroBox!: string;

  @Property()
  precioMensualBase!: number;
}


