import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1706776855785 implements MigrationInterface {
    name = 'Auto1706776855785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`points_deterioration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`percents\` int NULL, \`points\` int NULL, \`mc_id\` int NOT NULL, UNIQUE INDEX \`IDX_9e6a770f1ca4d28b84fb591023\` (\`mc_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`medical_facility\` ADD \`district_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`medical_facility\` ADD CONSTRAINT \`FK_9cbcf5f865dd1312ca0a27b2b94\` FOREIGN KEY (\`district_id\`) REFERENCES \`district\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`points_deterioration\` ADD CONSTRAINT \`FK_9e6a770f1ca4d28b84fb5910230\` FOREIGN KEY (\`mc_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`points_deterioration\` DROP FOREIGN KEY \`FK_9e6a770f1ca4d28b84fb5910230\``);
        await queryRunner.query(`ALTER TABLE \`medical_facility\` DROP FOREIGN KEY \`FK_9cbcf5f865dd1312ca0a27b2b94\``);
        await queryRunner.query(`ALTER TABLE \`medical_facility\` DROP COLUMN \`district_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_9e6a770f1ca4d28b84fb591023\` ON \`points_deterioration\``);
        await queryRunner.query(`DROP TABLE \`points_deterioration\``);
    }

}
