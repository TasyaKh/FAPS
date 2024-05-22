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
exports.Auto1706782589778 = void 0;
class Auto1706782589778 {
    constructor() {
        this.name = 'Auto1706782589778';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX \`IDX_2d443082eccd5198f95f2a36e2\` ON \`users\``);
            yield queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`login\``);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`users\` ADD \`login\` varchar(255) NOT NULL`);
            yield queryRunner.query(`CREATE UNIQUE INDEX \`IDX_2d443082eccd5198f95f2a36e2\` ON \`users\` (\`login\`)`);
        });
    }
}
exports.Auto1706782589778 = Auto1706782589778;
//# sourceMappingURL=1706782589778-auto.js.map