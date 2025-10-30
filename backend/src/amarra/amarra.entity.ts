import { Entity, PrimaryKey, Property, OneToMany, Enum } from '@mikro-orm/core';
import { IsNotEmpty, IsString, IsNumber, IsEnum} from 'class-validator';

export enum Estado {
  LIBRE = 'libre',
  OCUPADO = 'ocupado'
}

@Entity()
export class Amarra {
    @PrimaryKey()
    id?: number;

    @Enum(() => Estado)
    @IsEnum(Estado, { message: 'El estado debe ser: libre u ocupado' })
    @IsNotEmpty({ message: 'El estado es obligatorio' })
    estado!: Estado;

    @Property()
    @IsNumber({}, { message: 'El precio mensual debe ser un número' })
    precioMensualBase!: number;

    @Property()
    @IsNumber({}, { message: 'La longitud máxima debe ser un número' })
    longitudMax!: number;

    @Property()
    @IsString({ message: 'La zona debe ser texto' })
    @IsNotEmpty({ message: 'La zona es obligatoria' })
    zona!: string;

    @Property()
    @IsNumber({}, { message: 'El número de pilón debe ser un número' })
    nroPilon!: number;
}