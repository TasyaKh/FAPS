import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Auto1713677391890 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
