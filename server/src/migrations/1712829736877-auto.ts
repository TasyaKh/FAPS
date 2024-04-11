import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1712829736877 implements MigrationInterface {
    name = 'Auto1712829736877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`points_medical_center\` DROP FOREIGN KEY \`FK_eae0a72894d177c754791ea56ed\``);
        await queryRunner.query(`ALTER TABLE \`points_medical_center\` CHANGE \`user\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`points_medical_center\` ADD CONSTRAINT \`FK_4c406c6aebb6426553aa9191782\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`points_medical_center\` DROP FOREIGN KEY \`FK_4c406c6aebb6426553aa9191782\``);
        await queryRunner.query(`ALTER TABLE \`points_medical_center\` CHANGE \`user_id\` \`user\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`points_medical_center\` ADD CONSTRAINT \`FK_eae0a72894d177c754791ea56ed\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
