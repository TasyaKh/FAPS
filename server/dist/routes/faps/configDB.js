"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configDB = void 0;
const config_1 = __importDefault(require("config"));
exports.configDB = {
    host: config_1.default.get('host'),
    user: config_1.default.get('user'),
    password: config_1.default.get('password'),
    port: config_1.default.get('portDB'),
    database: config_1.default.get('database'),
    charset: 'utf8'
};
//# sourceMappingURL=configDB.js.map