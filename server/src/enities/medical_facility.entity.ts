import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Locality from "./locality.entity.js";
import {Type} from "./types.entity.js";

@Entity('medical_facility')
export class MedicalFacility {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column()
    binding_key: number;

    @Column()
    name: string;

    @Column({ type: 'double', nullable: true })
    latitude: number;

    @Column({ type: 'double', nullable: true })
    longitude: number;

    @Column({ nullable: true })
    street: string;

    @Column({ nullable: true })
    number_of_house: string;

    @Column({ length: 12, nullable: true })
    phone: string;

    @Column({ nullable: true })
    organization: string;

    @Column({ length: 13, nullable: true })
    ogrn: string;

    @Column({ length: 9, nullable: true })
    kpp: string;

    @ManyToOne(() => Locality, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'locality_id' })
    locality: Locality;

    @ManyToOne(() => Type, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'type_id' })
    type: Type;
}
