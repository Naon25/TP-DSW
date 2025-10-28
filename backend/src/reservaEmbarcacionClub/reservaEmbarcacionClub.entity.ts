import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Embarcacion } from "../embarcacion/embarcacion.entity.js";
import { Socio } from "../socio/socio.entity.js";

@Entity()
export class ReservaEmbarcacionClub extends BaseEntity {

  @Property({ nullable: false })
  fechaInicio!: Date;

  @Property({ nullable: false })
  fechaFin!: Date;

  @Property({nullable: false})
  estado!: string; //ACTIVA, CANCELADA, FINALIZADA

  @ManyToOne(() => Embarcacion, { nullable: false })
  embarcacion!: Rel<Embarcacion>;

  @ManyToOne(() => Socio, { nullable: false })
  socio!: Rel<Socio>;
}