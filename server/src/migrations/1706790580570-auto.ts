import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1706790580570 implements MigrationInterface {
    name = 'Auto1706790580570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`points_deteroation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`percents\` int NULL, \`points\` int NULL, \`mc_id\` int NOT NULL, UNIQUE INDEX \`IDX_71235117523ade40d2b8d78fed\` (\`mc_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`points_deteroation\` ADD CONSTRAINT \`FK_71235117523ade40d2b8d78fedf\` FOREIGN KEY (\`mc_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`points_deteroation\` DROP FOREIGN KEY \`FK_71235117523ade40d2b8d78fedf\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`DROP INDEX \`IDX_71235117523ade40d2b8d78fed\` ON \`points_deteroation\``);
        await queryRunner.query(`DROP TABLE \`points_deteroation\``);
    }

}
