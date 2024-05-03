import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1713677391890 implements MigrationInterface {
    name = 'Auto1713677391890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a554a5c7f55e201b1c68bef7ea\` ON \`medical_center\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`forgot_password_token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`forgot_password_token\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a554a5c7f55e201b1c68bef7ea\` ON \`medical_center\` (\`building_condition_id\`)`);
    }

}
