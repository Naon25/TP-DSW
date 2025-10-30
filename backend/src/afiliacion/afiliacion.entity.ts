import {
  Entity,
  Property,
  ManyToOne,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Socio } from '../socio/socio.entity.js';
import { IsNotEmpty, IsString, IsDate, IsOptional, IsEnum, Length } from 'class-validator';
import { Type } from 'class-transformer';

// Definir tipos de afiliación como enum para mejor validación
export enum TipoAfiliacion {
  BASICA = 'basica',
  PREMIUM = 'premium',
  VIP = 'vip'
}

@Entity()
export class Afiliacion extends BaseEntity {
  @Property({ nullable: false })
  @Type(() => Date)
  @IsDate({ message: 'La fecha de inicio debe ser una fecha válida' })
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  fechaInicio!: Date;

  @Property({ nullable: true }) // Cuando es null significa que la afiliacion esta activa
  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: 'La fecha de fin debe ser una fecha válida' })
  fechaFin?: Date;

  @Property({ nullable: false })
  @IsString({ message: 'El tipo debe ser texto' })
  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  tipo!: string;

  @ManyToOne(() => Socio, { nullable: false })
  @IsNotEmpty({ message: 'El socio es obligatorio' })
  socio!: Rel<Socio>;
}