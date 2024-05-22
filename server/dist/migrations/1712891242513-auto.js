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
exports.Auto1712891242513 = void 0;
class Auto1712891242513 {
    constructor() {
        this.name = 'Auto1712891242513';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`building_condition\` DROP FOREIGN KEY \`FK_fcfe1d9d69c09cdefa584c44d60\``);
            yield queryRunner.query(`DROP INDEX \`IDX_fcfe1d9d69c09cdefa584c44d6\` ON \`building_condition\``);
            yield queryRunner.query(`DROP INDEX \`REL_fcfe1d9d69c09cdefa584c44d6\` ON \`building_condition\``);
            yield queryRunner.query(`ALTER TABLE \`building_condition\` DROP COLUMN \`medical_center_id\``);
            yield queryRunner.query(`ALTER TABLE \`medical_center\` ADD \`building_condition_id\` int NULL`);
            yield queryRunner.query(`ALTER TABLE \`medical_center\` ADD UNIQUE INDEX \`IDX_a554a5c7f55e201b1c68bef7ea\` (\`building_condition_id\`)`);
            yield queryRunner.query(`CREATE UNIQUE INDEX \`REL_a554a5c7f55e201b1c68bef7ea\` ON \`medical_center\` (\`building_condition_id\`)`);
            yield queryRunner.query(`ALTER TABLE \`medical_center\` ADD CONSTRAINT \`FK_a554a5c7f55e201b1c68bef7ea7\` FOREIGN KEY (\`building_condition_id\`) REFERENCES \`building_condition\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`medical_center\` DROP FOREIGN KEY \`FK_a554a5c7f55e201b1c68bef7ea7\``);
            yield queryRunner.query(`DROP INDEX \`REL_a554a5c7f55e201b1c68bef7ea\` ON \`medical_center\``);
            yield queryRunner.query(`ALTER TABLE \`medical_center\` DROP INDEX \`IDX_a554a5c7f55e201b1c68bef7ea\``);
            yield queryRunner.query(`ALTER TABLE \`medical_center\` DROP COLUMN \`building_condition_id\``);
            yield queryRunner.query(`ALTER TABLE \`building_condition\` ADD \`medical_center_id\` int NULL`);
            yield queryRunner.query(`CREATE UNIQUE INDEX \`REL_fcfe1d9d69c09cdefa584c44d6\` ON \`building_condition\` (\`medical_center_id\`)`);
            yield queryRunner.query(`CREATE UNIQUE INDEX \`IDX_fcfe1d9d69c09cdefa584c44d6\` ON \`building_condition\` (\`medical_center_id\`)`);
            yield queryRunner.query(`ALTER TABLE \`building_condition\` ADD CONSTRAINT \`FK_fcfe1d9d69c09cdefa584c44d60\` FOREIGN KEY (\`medical_center_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.Auto1712891242513 = Auto1712891242513;
//# sourceMappingURL=1712891242513-auto.js.map