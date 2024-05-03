import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Locality from "./locality.entity";

@Entity('population')
export class Population {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   locality_id: number;

   @Column({ nullable: true })
   population_adult: number;

   @Column({ default: 0 })
   population_child: number;

   @Column({ nullable: true })
   year: number;

   @ManyToOne(() => Locality, { nullable: false, onDelete: 'CASCADE' })
   @JoinColumn({ name: 'locality_id' })
   locality: Locality;
}
