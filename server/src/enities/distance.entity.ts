import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import Locality from "./locality.entity.js";
import MedicalCenter from "./medical_center.entity.js";
import {MedicalFacility} from "./medical_facility.entity.js";

@Entity('distance')
export default class Distance {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ nullable: true })
   distance: number;

   @Column({ nullable: true })
   duration: number;

   @Column({ nullable: true })
   locality_id: number;

   @Column({ nullable: true })
   mc_id: number;

   @Column({ nullable: true })
   mc_facility_id: number;

   @ManyToOne(() => Locality, { nullable: true, onDelete: 'CASCADE' })
   @JoinColumn({ name: 'locality_id' })
   locality: Locality;

   @ManyToOne(() => MedicalCenter, { nullable: true, onDelete: 'CASCADE' })
   @JoinColumn({ name: 'mc_id' })
   medicalCenter: MedicalCenter;

   @ManyToOne(() => MedicalFacility, { nullable: true, onDelete: 'CASCADE' })
   @JoinColumn({ name: 'mc_facility_id' })
   medicalFacility: MedicalFacility;

}
