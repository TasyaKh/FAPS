import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import MedicalCenter from "./medical_center.entity";

@Entity('points_deterioration')
@Unique(['mc_id']) // This ensures that the `mc_id` column is unique
export class PointsDeterioration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    percents: number;

    @Column({ nullable: true })
    points: number;

    @Column()
    mc_id: number;

    @ManyToOne(() => MedicalCenter, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'mc_id' })
    medical_center: MedicalCenter;
}
