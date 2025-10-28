import { Entity, Property, ManyToOne, Cascade, Rel, OneToMany, Collection,  } from '@mikro-orm/core';
import { TipoEmbarcacion } from '../tipoEmbarcacion/tipoEmbarcacion.entity.js';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Socio } from '../socio/socio.entity.js';
import { ReservaEmbarcacionClub } from '../reservaEmbarcacionClub/reservaEmbarcacionClub.entity.js';

@Entity()
export class Embarcacion extends BaseEntity {

  @Property({nullable: false})
  nombre!: string;

  @Property({nullable: false})
  matricula!: string;

  @Property({nullable: false})
  eslora!: number;

  @ManyToOne(() => TipoEmbarcacion, { nullable: false})
  tipoEmbarcacion!: TipoEmbarcacion;

  @ManyToOne(() => Socio, { nullable: true })
  socio!: Rel<Socio>;

  @OneToMany(() => ReservaEmbarcacionClub, reserva => reserva.embarcacion, { cascade: [Cascade.ALL] }) 
  reservasEmbarcacionClub = new Collection<ReservaEmbarcacionClub>(this);
 

  
}
