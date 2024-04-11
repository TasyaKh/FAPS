import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Locality from "./locality.entity";
import {MedicalFacility} from "./medical_facility.entity";
import {Type} from "./types.entity";
import BuildingCondition from "./building_condition.entity";

@Entity('medical_center')
export default class MedicalCenter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    locality_id: number;

    @Column({ nullable: true})
    medical_facility_id: number;

    @Column({ nullable: true})
    type_id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    street: string;

    @Column({ nullable: true })
    number_of_house: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true, type: 'double' })
    latitude: number;

    @Column({ nullable: true, type: 'double' })
    longitude: number;

    @Column({ nullable: true, type: 'tinyint' })
    pharmacy: boolean;

    @Column({ nullable: true, type: 'smallint' })
    founding_year: number;

    @Column({ nullable: true, type: 'tinyint' })
    availability_of_emergency_mediical_care: boolean;

    @Column({ nullable: true, type: 'tinyint' })
    access_to_primary_health_care: boolean;

    @Column({ nullable: true, type: 'double' })
    staffing: number;

    // Define relationships
    @ManyToOne(() => Locality, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'locality_id' })
    locality: Locality;

    @OneToOne(() => BuildingCondition)
    building_condition: BuildingCondition;

    @ManyToOne(() => MedicalFacility, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'medical_facility_id' })
    medical_facility: MedicalFacility;

    @ManyToOne(() => Type, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'type_id' })
    type: Type;
}
