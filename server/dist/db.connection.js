"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const CONNECTION = {
    type: 'mysql',
    host: config_1.default.get('host'),
    port: config_1.default.get('portDB'),
    username: config_1.default.get('user'),
    password: config_1.default.get('password'),
    database: config_1.default.get('database'),
};
exports.default = CONNECTION;
//# sourceMappingURL=db.connection.js.map