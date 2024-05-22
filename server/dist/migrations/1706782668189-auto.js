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
exports.Auto1706782668189 = void 0;
class Auto1706782668189 {
    constructor() {
        this.name = 'Auto1706782668189';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
            yield queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(100) NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
            yield queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(20) NOT NULL`);
        });
    }
}
exports.Auto1706782668189 = Auto1706782668189;
//# sourceMappingURL=1706782668189-auto.js.map