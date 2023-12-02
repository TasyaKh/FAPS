import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn, OneToOne, OneToMany,
} from 'typeorm';
import District from "./district.entity";
import {Population} from "./population.entity";

@Entity('locality')
export default class Locality {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    district_id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true, type: 'double' })
    latitude: number;

    @Column({ nullable: true, type: 'double' })
    longitude: number;

    @ManyToOne(() => District, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'district_id' })
    district: District;

    @OneToOne(() => Population, (population) => population.locality)
    population: Population;

    // @OneToMany(() => Population, (population) => population.locality, {
    //     onDelete: 'CASCADE',
    // })
    // population: Population[];
}
