import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import {Region} from "./region.entity.js";

@Entity('district')
export default class District {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    region_id: number;

    @Column({ nullable: true })
    name: string;

    @ManyToOne(() => Region, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'region_id' })
    region: Region;
}
