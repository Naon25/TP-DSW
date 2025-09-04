import { Entity, PrimaryKey, Property, } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js';


@Entity()
export class Administrador extends BaseEntity {
    @PrimaryKey()
    id ?: number

    @Property({nullable: false})
    nombre!: string

    @Property()
     apellido!: string;

    @Property()
    email!: string

    @Property()
    password!: string;
    
}