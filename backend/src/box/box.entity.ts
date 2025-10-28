import { BaseEntity } from '../shared/baseEntity.entity.js';
import {Entity, Property, PrimaryKey, Enum} from '@mikro-orm/core';
import { IsNotEmpty, IsString, IsNumber, IsPositive, Min, Max, IsEnum, Length } from 'class-validator';

export enum Estado {
  DISPONIBLE = 'disponible',
  OCUPADO = 'ocupado',
  MANTENIMIENTO = 'mantenimiento'
}

@Entity()
export class Box extends BaseEntity {

  @PrimaryKey()
  id?: number;
      
  @Enum(() => Estado)
  @IsEnum(Estado, { message: 'El estado debe ser: disponible, ocupado o mantenimiento' })
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  estado!: Estado;

  @Property()
  @IsString({ message: 'El número de box debe ser texto' })
  @IsNotEmpty({ message: 'El número de box es obligatorio' })
  @Length(1, 10, { message: 'El número de box debe tener entre 1 y 10 caracteres' })
  nroBox!: string;

  @Property()
  @IsNumber({}, { message: 'El precio mensual debe ser un número' })
  @IsPositive({ message: 'El precio mensual debe ser positivo' })
  @Min(0, { message: 'El precio mensual no puede ser negativo' })
  @Max(100000, { message: 'El precio mensual no puede exceder 100000' })
  precioMensualBase!: number;
}