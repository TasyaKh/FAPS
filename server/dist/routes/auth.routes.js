var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import bcrypt from 'bcrypt';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';
const router = Router();
// https://www.youtube.com/watch?v=ivDjWYcKDZI&ab_channel=%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BB%D0%B5%D0%BD%D0%9C%D0%B8%D0%BD%D0%B8%D0%BD
// /api/auth/register
router.post('/register', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
        .isLength({ min: 6 })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            });
        }
        const { email, password } = req.body;
        const hashedPassword = yield bcrypt.hash(password, 12);
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
}));
// /api/auth/login
router.post('/login', [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').exists()
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            });
        }
        //const {email, password} = req.body
        //DEV DEPENDENCIES
        const email = 'test@test.ru';
        const password = 'test';
        const isMatch = yield bcrypt.compare(password, "$2b$12$.8wSHMmB1kS3OBZ4Xy1hQuZYeuTggGAeafEfQSlQfwPflHn49bTW2");
        if (!isMatch) {
            return res.status(400).json({ message: "Неверный логин или пароль" });
        }
        const token = jwt.sign({ userId: 'переменная с id пользователя' }, config.get('jwtSecret'), { expiresIn: '1hr' });
        res.json({ token, userId: '12345' });
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
}));
export default router;
//# sourceMappingURL=auth.routes.js.map