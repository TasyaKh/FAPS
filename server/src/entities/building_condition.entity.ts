import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm"
import MedicalCenter from "./medical_center.entity";

@Entity("building_condition")
export default class BuildingCondition {

   @PrimaryColumn()
   id: number

   @Column({
       type: "enum",
       enum: ['строится','реконструкция',
          'действующее'],
       default: null,
       nullable: true
   })
   state: string

   @Column()
   deteroation:number

   @ManyToOne(() => MedicalCenter, (mc) => mc.id, { onDelete: 'CASCADE' })
   @JoinColumn([{ name: 'medical_center_id' }])
   medical_center:MedicalCenter
}