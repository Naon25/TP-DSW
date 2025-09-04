import { Entity, PrimaryKey, Property,BeforeCreate } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js';
import bcrypt from 'bcrypt';

@Entity()
export class Administrador extends BaseEntity {
    @PrimaryKey()
    id ?: number

    @Property({nullable: false})
    nombre!: string

    @Property()
    dni!: string;

    @Property()
    apellido!: string;

    @Property()
    email!: string

    @Property()
    password!: string;

    @BeforeCreate()
        async hashPassword() {
      if (this.dni) {
        const rawPassword = this.dni.slice(-6)
        this.password = await bcrypt.hash(rawPassword, 10)
      }
    }
}