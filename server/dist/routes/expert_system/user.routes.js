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
const express_1 = require("express");
const auth_service_1 = require("../../services/auth.service");
const roles_1 = require("../../roles");
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/user', router);
    router.post('/grant-role', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.ADMIN);
        if (granted) {
            try {
                const dto = req.body;
                yield (0, auth_service_1.grantRole)(dto);
                res.json({ message: "Успешно" });
            }
            catch (err) {
                res.status(400).json(err.message);
            }
        }
    }));
    // find users
    router.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dto = req.query;
            const users = yield (0, auth_service_1.findUsers)(dto);
            res.json(users);
        }
        catch (err) {
            res.status(400).json(err.message);
        }
    }));
};
//# sourceMappingURL=user.routes.js.map