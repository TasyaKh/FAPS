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
exports.Auto1712829736877 = void 0;
class Auto1712829736877 {
    constructor() {
        this.name = 'Auto1712829736877';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`points_medical_center\` DROP FOREIGN KEY \`FK_eae0a72894d177c754791ea56ed\``);
            yield queryRunner.query(`ALTER TABLE \`points_medical_center\` CHANGE \`user\` \`user_id\` int NULL`);
            yield queryRunner.query(`ALTER TABLE \`points_medical_center\` ADD CONSTRAINT \`FK_4c406c6aebb6426553aa9191782\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`points_medical_center\` DROP FOREIGN KEY \`FK_4c406c6aebb6426553aa9191782\``);
            yield queryRunner.query(`ALTER TABLE \`points_medical_center\` CHANGE \`user_id\` \`user\` int NULL`);
            yield queryRunner.query(`ALTER TABLE \`points_medical_center\` ADD CONSTRAINT \`FK_eae0a72894d177c754791ea56ed\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
}
exports.Auto1712829736877 = Auto1712829736877;
//# sourceMappingURL=1712829736877-auto.js.map