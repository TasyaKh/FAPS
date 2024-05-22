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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typeorm_config_1 = __importDefault(require("../typeorm.config"));
const user_entity_1 = require("../entities/user.entity");
class UserService {
    constructor() {
        this.userRepo = typeorm_config_1.default.getRepository(user_entity_1.User);
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.findOne({ where: { id: id } });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.findOne({ where: { email: email } });
        });
    }
    updateUser(id, userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = typeorm_config_1.default.getRepository(user_entity_1.User);
            return userRepo.update(id, userDto);
        });
    }
    findByPasswordResetToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.findOne({
                where: { forgot_password_token: token },
            });
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map