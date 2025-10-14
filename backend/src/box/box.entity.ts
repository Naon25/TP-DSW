import { BaseEntity } from '../shared/baseEntity.entity.js';
import {
  Entity,
  Property,
  PrimaryKey,
} from '@mikro-orm/core';

export type Estado = 'disponible' | 'ocupado' | 'mantenimiento';

@Entity()
export class Box extends BaseEntity {


  @Property()
  estado!: Estado;

  @Property()
  nroBox!: string;

  @Property()
  precioMensualBase!: number;
}
