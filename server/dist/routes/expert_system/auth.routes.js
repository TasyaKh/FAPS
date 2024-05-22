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
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/auth', router);
    router.get('/', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let user = null;
        try {
            const userId = req.user.id;
            user = yield (0, auth_service_1.getUser)(userId);
        }
        catch (err) {
            res.status(400).json(err.message);
        }
        res.status(200).json(user);
    }));
    router.post('/sign-up', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const token = yield (0, auth_service_1.signup)({ name: name, email: email, password: password });
            if (token)
                res.status(200).json({ message: "Сохранено" });
            else
                res.status(200).json("Что то пошло не так при создании");
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err.message);
        }
    }));
    router.post('/login', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { nameEmail, password } = req.body;
            const token = yield (0, auth_service_1.login)({ nameEmail: nameEmail, password: password });
            if (token)
                res.status(200).header("Authorization", token).send({ "token": token });
            else
                res.status(401).send('Что-то пошло не так');
        }
        catch (err) {
            res.status(400).json(err.message);
        }
    }));
    router.post('/forgot-password', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            yield (0, auth_service_1.forgotPassword)(email).then(() => {
                res.status(200).json({ message: "Отправлено" });
            });
        }
        catch (err) {
            res.status(400).json(err.message);
        }
    }));
    router.post('/reset-password', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { forgot_password_token, password } = req.body;
            yield (0, auth_service_1.resetPassword)(forgot_password_token, password).then(() => {
                res.status(200).json({ message: "Успешно" });
            });
        }
        catch (err) {
            res.status(400).json(err.message);
        }
    }));
};
//# sourceMappingURL=auth.routes.js.map