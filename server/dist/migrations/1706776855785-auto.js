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
exports.Auto1706776855785 = void 0;
class Auto1706776855785 {
    constructor() {
        this.name = 'Auto1706776855785';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`points_deterioration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`percents\` int NULL, \`points\` int NULL, \`mc_id\` int NOT NULL, UNIQUE INDEX \`IDX_9e6a770f1ca4d28b84fb591023\` (\`mc_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`medical_facility\` ADD \`district_id\` int NULL`);
            yield queryRunner.query(`ALTER TABLE \`medical_facility\` ADD CONSTRAINT \`FK_9cbcf5f865dd1312ca0a27b2b94\` FOREIGN KEY (\`district_id\`) REFERENCES \`district\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`points_deterioration\` ADD CONSTRAINT \`FK_9e6a770f1ca4d28b84fb5910230\` FOREIGN KEY (\`mc_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`points_deterioration\` DROP FOREIGN KEY \`FK_9e6a770f1ca4d28b84fb5910230\``);
            yield queryRunner.query(`ALTER TABLE \`medical_facility\` DROP FOREIGN KEY \`FK_9cbcf5f865dd1312ca0a27b2b94\``);
            yield queryRunner.query(`ALTER TABLE \`medical_facility\` DROP COLUMN \`district_id\``);
            yield queryRunner.query(`DROP INDEX \`IDX_9e6a770f1ca4d28b84fb591023\` ON \`points_deterioration\``);
            yield queryRunner.query(`DROP TABLE \`points_deterioration\``);
        });
    }
}
exports.Auto1706776855785 = Auto1706776855785;
//# sourceMappingURL=1706776855785-auto.js.map