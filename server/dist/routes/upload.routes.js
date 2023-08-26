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
import config from 'config';
import multer from 'multer';
import { initializeConnection } from '../functions/initializeConnection.js';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import fs from 'fs';
const router = Router();
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./client/public/attached/images/");
    },
    filename: (req, file, cb) => {
        const cyrillicToTranslit = new CyrillicToTranslit();
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
const configDB = {
    host: config.get('host'),
    user: config.get('user'),
    password: config.get('password'),
    port: config.get('portDB'),
    database: config.get('database'),
    charset: 'utf8'
};
const deleteFile = (filename) => {
    try {
        fs.unlinkSync('./client/public/attached/images/' + filename);
        console.log('Файл удален:', filename);
    }
    catch (e) {
        console.log('Ошибка удаления файла', e);
    }
};
// /api/upload/images
router.post('/images', multer(({ storage: storageConfig, fileFilter: fileFilter })).single("filedata"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file)
            res.status(500).json({ message: 'Неверный формат файла' });
        const connection = initializeConnection(configDB);
        try {
            connection.query('INSERT INTO `photo` (`id`, `medical_center_id`, `name`) VALUES (?, ?, ?)', [null, req.body.id, req.file.filename], (err, rows) => {
                connection.end();
                if (err) {
                    deleteFile(req.file.filename);
                    throw err;
                }
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
        catch (sqlErrors) {
            deleteFile(req.file.filename);
            console.log('SQL Errors', sqlErrors);
        }
    }
    catch (e) {
        deleteFile(req.file.filename);
        console.log(e);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
}));
// /api/upload/images/delete
router.post('/images/delete', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = initializeConnection(configDB);
        try {
            connection.query('DELETE FROM `photo` WHERE `photo`.`id` = ?', [req.body.id], (err) => {
                connection.end();
                if (err) {
                    throw err;
                }
                deleteFile(req.body.name);
                res.status(200).send({
                    message: 'Файл удален'
                });
            });
        }
        catch (sqlErrors) {
            console.log('SQL Errors', sqlErrors);
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
}));
export default router;
//# sourceMappingURL=upload.routes.js.map