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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const cyrillic_to_translit_js_1 = __importDefault(require("cyrillic-to-translit-js"));
const fs_1 = __importDefault(require("fs"));
const typeorm_config_1 = __importDefault(require("../../typeorm.config"));
const auth_service_1 = require("../../services/auth.service");
const roles_1 = require("../../roles");
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/upload', router);
    const storageConfig = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./client/public/attached/images/");
        },
        filename: (req, file, cb) => {
            //@ts-ignore
            const cyrillicToTranslit = new cyrillic_to_translit_js_1.default();
            const translitFileName = cyrillicToTranslit.transform(file.originalname, '_').toLowerCase();
            let fileName = translitFileName.split('.');
            const exp = fileName.pop();
            const now = new Date();
            let date = '(' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + '-' + now.getDay() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + ')';
            fileName = fileName.join() + date + '.' + exp;
            cb(null, fileName);
        }
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    };
    const deleteFile = (filename) => {
        try {
            fs_1.default.unlinkSync('./client/public/attached/images/' + filename);
            console.log('Файл удален:', filename);
        }
        catch (e) {
            console.log('Ошибка удаления файла', e);
        }
    };
    // /api/upload/images
    router.post('/images', auth_service_1.verifyUserToken, (0, multer_1.default)(({ storage: storageConfig, fileFilter: fileFilter })).single("filedata"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                if (!req.file)
                    res.status(500).json({ message: 'Неверный формат файла' });
                let query = 'INSERT INTO `photo` (`id`, `medical_center_id`, `name`) VALUES (?, ?, ?)';
                const entityManager = typeorm_config_1.default.createEntityManager();
                const result = yield entityManager.query(query, [null, req.body.id, req.file.filename]).catch((err) => {
                    deleteFile(req.file.filename);
                    throw err;
                }).then((rows) => {
                    res.status(200).send({
                        message: 'Файл загружен',
                        image: {
                            id: rows.insertId,
                            medical_center_id: parseInt(req.body.id),
                            name: req.file.filename
                        }
                    });
                });
            }
            catch (e) {
                deleteFile(req.file.filename);
                console.log(e);
                res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
            }
        }
    }));
    // /api/upload/images/delete
    router.post('/images/delete', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                let query = 'DELETE FROM `photo` WHERE `photo`.`id` = ?';
                const result = yield entityManager.query(query, [req.body.id]);
                deleteFile(req.body.name);
                res.status(200).send({
                    message: 'Файл удален'
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
            }
        }
    }));
};
//# sourceMappingURL=upload.routes.js.map