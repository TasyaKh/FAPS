import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"
import MedicalCenter from "./medical_center.entity";

@Entity("building_condition")
export default class BuildingCondition {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: ['строится', 'реконструкция',
            'действующее'],
        default: null,
        nullable: true
    })
    state: string

    @Column()
    deteroation: number

    @OneToOne(() => MedicalCenter)
    medical_center: MedicalCenter;
}
