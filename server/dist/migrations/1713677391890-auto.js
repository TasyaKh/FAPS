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
exports.Auto1713677391890 = void 0;
class Auto1713677391890 {
    constructor() {
        this.name = 'Auto1713677391890';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX \`IDX_a554a5c7f55e201b1c68bef7ea\` ON \`medical_center\``);
            yield queryRunner.query(`ALTER TABLE \`users\` ADD \`forgot_password_token\` varchar(255) NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`forgot_password_token\``);
            yield queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a554a5c7f55e201b1c68bef7ea\` ON \`medical_center\` (\`building_condition_id\`)`);
        });
    }
}
exports.Auto1713677391890 = Auto1713677391890;
//# sourceMappingURL=1713677391890-auto.js.map