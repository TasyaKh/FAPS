import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1712891242513 implements MigrationInterface {
    name = 'Auto1712891242513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`building_condition\` DROP FOREIGN KEY \`FK_fcfe1d9d69c09cdefa584c44d60\``);
        await queryRunner.query(`DROP INDEX \`IDX_fcfe1d9d69c09cdefa584c44d6\` ON \`building_condition\``);
        await queryRunner.query(`DROP INDEX \`REL_fcfe1d9d69c09cdefa584c44d6\` ON \`building_condition\``);
        await queryRunner.query(`ALTER TABLE \`building_condition\` DROP COLUMN \`medical_center_id\``);
        await queryRunner.query(`ALTER TABLE \`medical_center\` ADD \`building_condition_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`medical_center\` ADD UNIQUE INDEX \`IDX_a554a5c7f55e201b1c68bef7ea\` (\`building_condition_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a554a5c7f55e201b1c68bef7ea\` ON \`medical_center\` (\`building_condition_id\`)`);
        await queryRunner.query(`ALTER TABLE \`medical_center\` ADD CONSTRAINT \`FK_a554a5c7f55e201b1c68bef7ea7\` FOREIGN KEY (\`building_condition_id\`) REFERENCES \`building_condition\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`medical_center\` DROP FOREIGN KEY \`FK_a554a5c7f55e201b1c68bef7ea7\``);
        await queryRunner.query(`DROP INDEX \`REL_a554a5c7f55e201b1c68bef7ea\` ON \`medical_center\``);
        await queryRunner.query(`ALTER TABLE \`medical_center\` DROP INDEX \`IDX_a554a5c7f55e201b1c68bef7ea\``);
        await queryRunner.query(`ALTER TABLE \`medical_center\` DROP COLUMN \`building_condition_id\``);
        await queryRunner.query(`ALTER TABLE \`building_condition\` ADD \`medical_center_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_fcfe1d9d69c09cdefa584c44d6\` ON \`building_condition\` (\`medical_center_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_fcfe1d9d69c09cdefa584c44d6\` ON \`building_condition\` (\`medical_center_id\`)`);
        await queryRunner.query(`ALTER TABLE \`building_condition\` ADD CONSTRAINT \`FK_fcfe1d9d69c09cdefa584c44d60\` FOREIGN KEY (\`medical_center_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
