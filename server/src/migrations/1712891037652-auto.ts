import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1712891037652 implements MigrationInterface {
    name = 'Auto1712891037652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`building_condition\` DROP FOREIGN KEY \`FK_fcfe1d9d69c09cdefa584c44d60\``);
        await queryRunner.query(`ALTER TABLE \`building_condition\` ADD UNIQUE INDEX \`IDX_fcfe1d9d69c09cdefa584c44d6\` (\`medical_center_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_fcfe1d9d69c09cdefa584c44d6\` ON \`building_condition\` (\`medical_center_id\`)`);
        await queryRunner.query(`ALTER TABLE \`building_condition\` ADD CONSTRAINT \`FK_fcfe1d9d69c09cdefa584c44d60\` FOREIGN KEY (\`medical_center_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`building_condition\` DROP FOREIGN KEY \`FK_fcfe1d9d69c09cdefa584c44d60\``);
        await queryRunner.query(`DROP INDEX \`REL_fcfe1d9d69c09cdefa584c44d6\` ON \`building_condition\``);
        await queryRunner.query(`ALTER TABLE \`building_condition\` DROP INDEX \`IDX_fcfe1d9d69c09cdefa584c44d6\``);
        await queryRunner.query(`ALTER TABLE \`building_condition\` ADD CONSTRAINT \`FK_fcfe1d9d69c09cdefa584c44d60\` FOREIGN KEY (\`medical_center_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
