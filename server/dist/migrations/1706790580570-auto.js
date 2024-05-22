"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto1706790580570 = void 0;
class Auto1706790580570 {
    constructor() {
        this.name = 'Auto1706790580570';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`points_deteroation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`percents\` int NULL, \`points\` int NULL, \`mc_id\` int NOT NULL, UNIQUE INDEX \`IDX_71235117523ade40d2b8d78fed\` (\`mc_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NULL`);
            yield queryRunner.query(`ALTER TABLE \`points_deteroation\` ADD CONSTRAINT \`FK_71235117523ade40d2b8d78fedf\` FOREIGN KEY (\`mc_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`points_deteroation\` DROP FOREIGN KEY \`FK_71235117523ade40d2b8d78fedf\``);
            yield queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
            yield queryRunner.query(`DROP INDEX \`IDX_71235117523ade40d2b8d78fed\` ON \`points_deteroation\``);
            yield queryRunner.query(`DROP TABLE \`points_deteroation\``);
        });
    }
}
exports.Auto1706790580570 = Auto1706790580570;
//# sourceMappingURL=1706790580570-auto.js.map