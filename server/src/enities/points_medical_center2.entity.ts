import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {User} from "./user.entity.js";

@Entity('points_medical_center')
export class PointsMedicalCenter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    adult_population: number;

    @Column({ nullable: true })
    child_population: number;

    @Column({ nullable: true })
    foundation_year: number;

    @Column({ nullable: true })
    staffing: number;

    @Column({ nullable: true })
    state: number;

    @Column({ nullable: true })
    each_pers_staffing: number;

    @Column({ nullable: true })
    max_found_year: number;

    @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user' })
    user: User;
}
