import {Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import {User} from "./user.entity";
@Entity('conditions_locality')
export class ConditionsLocality {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'double', nullable: true })
    min_dist_mc: number | null;

    @Column({ type: 'int', nullable: true })
    population_FAP: number | null;

    @Column({ type: 'int', nullable: true })
    population_Ambulatory: number | null;

    @OneToOne(() => User, (user)=>user.conditions_locality)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
