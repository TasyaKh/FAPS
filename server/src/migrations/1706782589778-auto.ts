import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1706782589778 implements MigrationInterface {
    name = 'Auto1706782589778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2d443082eccd5198f95f2a36e2\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`login\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`login\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_2d443082eccd5198f95f2a36e2\` ON \`users\` (\`login\`)`);
    }

}
