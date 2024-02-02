import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import {ConditionsLocality} from "./conditions_locality.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    email: string;

    @Column({ length: 100 })
    password: string;

    @Column({ nullable: true })
    session: string;

    @Column()
    role_name: string;

    @OneToOne(() => ConditionsLocality, (cL)=>cL.user)
    conditions_locality: ConditionsLocality;
}
