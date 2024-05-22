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
exports.Auto1706771890985 = void 0;
class Auto1706771890985 {
    constructor() {
        this.name = 'Auto1706771890985';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`medical_facility\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
            yield queryRunner.query(`ALTER TABLE \`conditions_locality\` ADD CONSTRAINT \`FK_867935cebbface5bb22f392173c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`distance\` ADD CONSTRAINT \`FK_ff6274d5468e963cae20352a9b7\` FOREIGN KEY (\`mc_facility_id\`) REFERENCES \`medical_facility\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`medical_center\` ADD CONSTRAINT \`FK_8f0ad4e421f649f3b116cc67b29\` FOREIGN KEY (\`locality_id\`) REFERENCES \`locality\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`medical_center\` ADD CONSTRAINT \`FK_c0604103e5eecf7219896e06604\` FOREIGN KEY (\`medical_facility_id\`) REFERENCES \`medical_facility\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`medical_center\` ADD CONSTRAINT \`FK_1a32a5a28596f598a3f8425e9db\` FOREIGN KEY (\`type_id\`) REFERENCES \`types\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`building_condition\` ADD CONSTRAINT \`FK_fcfe1d9d69c09cdefa584c44d60\` FOREIGN KEY (\`medical_center_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`points_medical_center\` ADD CONSTRAINT \`FK_eae0a72894d177c754791ea56ed\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`staff\` ADD CONSTRAINT \`FK_c80c6b373a4b9da6d5f457fa686\` FOREIGN KEY (\`medical_center_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`points_deterioration\` ADD CONSTRAINT \`FK_9e6a770f1ca4d28b84fb5910230\` FOREIGN KEY (\`mc_id\`) REFERENCES \`medical_center\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`points_deterioration\` DROP FOREIGN KEY \`FK_9e6a770f1ca4d28b84fb5910230\``);
            yield queryRunner.query(`ALTER TABLE \`staff\` DROP FOREIGN KEY \`FK_c80c6b373a4b9da6d5f457fa686\``);
            yield queryRunner.query(`ALTER TABLE \`points_medical_center\` DROP FOREIGN KEY \`FK_eae0a72894d177c754791ea56ed\``);
            yield queryRunner.query(`ALTER TABLE \`building_condition\` DROP FOREIGN KEY \`FK_fcfe1d9d69c09cdefa584c44d60\``);
            yield queryRunner.query(`ALTER TABLE \`medical_center\` DROP FOREIGN KEY \`FK_1a32a5a28596f598a3f8425e9db\``);
            yield queryRunner.query(`ALTER TABLE \`medical_center\` DROP FOREIGN KEY \`FK_c0604103e5eecf7219896e06604\``);
            yield queryRunner.query(`ALTER TABLE \`medical_center\` DROP FOREIGN KEY \`FK_8f0ad4e421f649f3b116cc67b29\``);
            yield queryRunner.query(`ALTER TABLE \`distance\` DROP FOREIGN KEY \`FK_ff6274d5468e963cae20352a9b7\``);
            yield queryRunner.query(`ALTER TABLE \`conditions_locality\` DROP FOREIGN KEY \`FK_867935cebbface5bb22f392173c\``);
            yield queryRunner.query(`ALTER TABLE \`medical_facility\` CHANGE \`id\` \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT`);
        });
    }
}
exports.Auto1706771890985 = Auto1706771890985;
//# sourceMappingURL=1706771890985-auto.js.map