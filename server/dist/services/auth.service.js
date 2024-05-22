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
exports.findUsers = exports.grantRole = exports.checkUserRoleOrErr = exports.getUser = exports.resetPassword = exports.forgotPassword = exports.verifyUserToken = exports.login = exports.signup = void 0;
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const typeorm_config_1 = __importDefault(require("../typeorm.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const roles_1 = require("../roles");
const uuid_1 = require("uuid");
const user_service_1 = require("./user.service");
const email_service_1 = __importDefault(require("./email.service"));
const signup = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (((_a = newUser.name) === null || _a === void 0 ? void 0 : _a.length) >= 3 && ((_b = newUser.password) === null || _b === void 0 ? void 0 : _b.length) >= 6) {
        //Hash password
        const salt = yield bcrypt_1.default.genSalt(10);
        const encryptedPassword = yield bcrypt_1.default.hash(newUser.password, salt);
        // Create user object
        let user = new user_entity_1.User();
        user.name = newUser.name;
        user.password = encryptedPassword;
        user.email = newUser.email;
        const userRepository = typeorm_config_1.default.getRepository(user_entity_1.User);
        // check username
        const existingUserByName = yield userRepository.findOne({ where: { name: user.name } });
        if (existingUserByName)
            throw new Error("Имя пользователя уже занято");
        // check email
        const existingUserByEmail = yield userRepository.findOne({ where: { email: user.email } });
        if (existingUserByEmail)
            throw new Error("Email уже занят");
        const createdUser = yield userRepository.save(Object.assign(Object.assign({}, user), { role_name: roles_1.Roles.USER }));
        let payload = { id: createdUser.id, name: createdUser.name, role: createdUser.role_name };
        return jsonwebtoken_1.default.sign(payload, config_1.default.get('secret'));
    }
    else
        throw new Error("Длина пароля должна быть > 5 и имя пользователя > 2 символов");
});
exports.signup = signup;
const login = (findUser) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_config_1.default.getRepository(user_entity_1.User);
    let existingUser = null;
    if (findUser.nameEmail)
        existingUser = yield userRepository.findOne({
            where: [
                { name: findUser.nameEmail },
                { email: findUser.nameEmail },
            ],
        });
    let validPass = false;
    if (existingUser)
        validPass = yield bcrypt_1.default.compare(findUser.password, existingUser === null || existingUser === void 0 ? void 0 : existingUser.password);
    if (!validPass) {
        throw new Error("Имя/Email или пароль неверны");
    }
    // Set token expiration time to 1 *24 hour (you can adjust this as needed)
    const expiresIn = 60 * 60 * 24;
    // Create and assign token
    let payload = { id: existingUser === null || existingUser === void 0 ? void 0 : existingUser.id, name: existingUser === null || existingUser === void 0 ? void 0 : existingUser.name, role: existingUser === null || existingUser === void 0 ? void 0 : existingUser.role_name };
    return jsonwebtoken_1.default.sign(payload, config_1.default.get('secret'), { expiresIn });
});
exports.login = login;
const verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token)
        return res.status(401).send("Access Denied / Unauthorized request");
    try {
        let verifiedUser = jsonwebtoken_1.default.verify(token, config_1.default.get('secret')); // config.TOKEN_SECRET => 'secretKey'
        if (!verifiedUser)
            return res.status(401).send('Unauthorized request');
        req.user = verifiedUser; // user_id & user_type_id
        next();
    }
    catch (error) {
        res.status(403).send("Invalid Token, Unauthorized");
    }
};
exports.verifyUserToken = verifyUserToken;
function forgotPassword(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const usersService = new user_service_1.UserService();
        const user = yield usersService.findByEmail(email);
        if (!user) {
            throw new Error("Email не найден");
        }
        const emailService = new email_service_1.default();
        const forgotPasswordToken = (0, uuid_1.v4)();
        yield usersService.updateUser(user.id, { forgot_password_token: forgotPasswordToken });
        emailService
            .sendPasswordResetEmail(email, forgotPasswordToken, user.name)
            .catch((err) => console.error('Error while sending password reset mail', err));
    });
}
exports.forgotPassword = forgotPassword;
function resetPassword(token, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const usersService = new user_service_1.UserService();
        const user = yield usersService.findByPasswordResetToken(token);
        if (!user) {
            throw new Error('Ссылка сброса не существует');
        }
        else {
            if ((password === null || password === void 0 ? void 0 : password.length) >= 6) {
                //Hash password
                const salt = yield bcrypt_1.default.genSalt(10);
                const encryptedPassword = yield bcrypt_1.default.hash(password, salt);
                yield usersService.updateUser(user.id, {
                    password: encryptedPassword,
                    forgot_password_token: null,
                });
            }
            else
                throw new Error("Длина пароля должна быть > 5");
        }
    });
}
exports.resetPassword = resetPassword;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_config_1.default.getRepository(user_entity_1.User);
    return yield userRepository.findOne({ where: { id: id } });
});
exports.getUser = getUser;
const checkUserRoleOrErr = (req, res, requiredRole) => {
    var _a;
    // console.log(req.user)
    const userRole = req.user.role;
    if (userRole === roles_1.Roles.ADMIN || ((_a = roles_1.roleHierarchy[userRole]) === null || _a === void 0 ? void 0 : _a.includes(requiredRole))) {
        return true;
    }
    else
        res.status(403).send("У вас нет доступа - " + requiredRole);
};
exports.checkUserRoleOrErr = checkUserRoleOrErr;
const grantRole = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_config_1.default.getRepository(user_entity_1.User);
    return yield userRepository.update(dto.id, Object.assign({}, dto));
});
exports.grantRole = grantRole;
const findUsers = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = typeorm_config_1.default.getRepository(user_entity_1.User);
    let query = userRepository.createQueryBuilder("users")
        .limit(dto.limit)
        .offset(dto.offset);
    // search
    dto.search ? query.andWhere(`(LOWER(users.name) like :search 
         or LOWER(users.email) like :search)`, {
        search: `%${dto.search}%`,
    }) : null;
    return query.getManyAndCount();
});
exports.findUsers = findUsers;
//# sourceMappingURL=auth.service.js.map