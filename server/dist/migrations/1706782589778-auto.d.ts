import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Auto1706782589778 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
