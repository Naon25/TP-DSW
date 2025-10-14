import { Entity, PrimaryKey, Property, OneToMany, Enum  } from '@mikro-orm/core';

export enum Estado {
  LIBRE = 'libre',
  OCUPADO = 'ocupado'
}

@Entity()
export class Amarra{
    @PrimaryKey()
    id?: number

    @Enum(() => Estado)
    estado!: Estado

    @Property()
    precioMensualBase!: number

    @Property()
    longitudMax!: number

    @Property()
    zona!: string

    @Property()
    nroPilon!: number


}
