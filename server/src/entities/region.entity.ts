import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('region')
export class Region {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;
}
