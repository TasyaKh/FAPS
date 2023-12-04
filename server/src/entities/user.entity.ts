import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import {Role} from "./roles.entity";
import {ConditionsLocality} from "./conditions_locality.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ unique: true })
    login: string;

    @Column({ length: 20 })
    password: string;

    @Column({ nullable: true })
    session: string;

    @Column()
    role_id: number;

    @ManyToOne(() => Role, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToOne(() => ConditionsLocality, (cL)=>cL.user)
    conditions_locality: ConditionsLocality;
}
