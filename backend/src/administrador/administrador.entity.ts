import { Entity, PrimaryKey, Property, } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js';
import crypto from 'node:crypto';


@Entity()
export class Administrador extends BaseEntity {
    @PrimaryKey()
    id ?: number

    @Property({nullable: false})
    nombre!: string

    @Property()
    email!: string
    
}