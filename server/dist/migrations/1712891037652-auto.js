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
exports.Auto1712891037652 = void 0;
class Auto1712891037652 {
    constructor() {
        this.name = 'Auto1712891037652';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`building_condition\` DROP FOREIGN KEY \`FK_fcfe1d9d69c09cdefa584c44d60\``);
            yield queryRunner.query(`ALTER TABLE \`building_condition\` ADD UNIQUE INDEX \`IDX_fcfe1d9d69c09cdefa584c44d6\` (\`medical_center_id\`)`);
            yield queryRunner.query(`CREATE UNIQUE INDEX \`REL_fcfe1d9d69c09cdefa584c44d6\` ON \`building_condition\` (\`medical_center_id\`)`);
            yield queryRunner.query(`ALTER TABLE \`building_condition\` ADD CONSTRAINT \`FK_fcfe1d9d69c09cdefa584c44d60\` FOREIGN KEY (\`medical_center_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`building_condition\` DROP FOREIGN KEY \`FK_fcfe1d9d69c09cdefa584c44d60\``);
            yield queryRunner.query(`DROP INDEX \`REL_fcfe1d9d69c09cdefa584c44d6\` ON \`building_condition\``);
            yield queryRunner.query(`ALTER TABLE \`building_condition\` DROP INDEX \`IDX_fcfe1d9d69c09cdefa584c44d6\``);
            yield queryRunner.query(`ALTER TABLE \`building_condition\` ADD CONSTRAINT \`FK_fcfe1d9d69c09cdefa584c44d60\` FOREIGN KEY (\`medical_center_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
}
exports.Auto1712891037652 = Auto1712891037652;
//# sourceMappingURL=1712891037652-auto.js.map