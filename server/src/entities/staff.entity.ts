import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import MedicalCenter from "./medical_center.entity";

@Entity('staff')
export class Staff {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   medical_center_id: number;

   @Column({ type: 'date' })
   date: Date;

   @Column({ nullable: true })
   position: string;

   @Column({ type: 'double', unsigned: true })
   rate_full: number;

   @Column({ type: 'double', unsigned: true })
   rate_occupied: number;

   @ManyToOne(() => MedicalCenter, { nullable: false, onDelete: 'CASCADE' })
   @JoinColumn({ name: 'medical_center_id' })
   medical_center: MedicalCenter;
}
