import { Cascade, Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Embarcacion } from '../embarcacion/embarcacion.entity.js';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

@Entity()
export class TipoEmbarcacion extends BaseEntity {

  @Property({ nullable: false, unique: true })
  @IsString({ message: 'El nombre del tipo de embarcación debe ser texto' })
  @IsNotEmpty({ message: 'El nombre del tipo de embarcación es obligatorio' })
  nombre!: string;

  @Property()
  @IsNumber({}, { message: 'La eslora máxima debe ser un número' })
  @Min(1, { message: 'La eslora máxima debe ser mayor que 0' })
  esloraMaxima!: number;

  @OneToMany(
    () => Embarcacion,
    (embarcacion) => embarcacion.tipoEmbarcacion,
    { cascade: [Cascade.ALL] }
  )
  embarcaciones = new Collection<Embarcacion>(this);
}
