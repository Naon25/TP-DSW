import { BaseEntity } from '../shared/baseEntity.entity.js';
import {
  Entity,
  Property,
  PrimaryKey,
} from '@mikro-orm/core';

@Entity()
export class Box extends BaseEntity {


  @Property()
  estado!: string;

  @Property()
  nroBox!: string;

  @Property()
  precioMensualBase!: number;
}
