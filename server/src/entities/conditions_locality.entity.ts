import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import {User} from "./user.entity";
@Entity('conditions_locality')
export class ConditionsLocality {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'double', nullable: true })
    minDistMc: number | null;

    @Column({ type: 'int', nullable: true })
    populationFAP: number | null;

    @Column({ type: 'int', nullable: true })
    populationAmbulatory: number | null;

    @ManyToOne(() => User, {onDelete:"CASCADE"})
    @JoinColumn({ name: 'user_id' })
    user: User;
}
