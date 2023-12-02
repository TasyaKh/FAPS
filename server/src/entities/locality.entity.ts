import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn, OneToOne, OneToMany,
} from 'typeorm';
import District from "./district.entity";
import {Population} from "./population.entity";
import Distance from "./distance.entity";

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

    // med center
    @OneToMany(() => Distance, (dist) => dist.locality, {
        onDelete: 'CASCADE',
    })
    distances_mc: Distance[];

    // medical facility (org)
    @OneToMany(() => Distance, (dist) => dist.locality, {
        onDelete: 'CASCADE',
    })
    distances_mf: Distance[];
}
