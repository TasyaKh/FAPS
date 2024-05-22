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
const typeorm_config_1 = __importDefault(require("../../typeorm.config"));
const auth_service_1 = require("../../services/auth.service");
const roles_1 = require("../../roles");
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/edit', router);
    const updateRatesInDataBase = (id) => __awaiter(void 0, void 0, void 0, function* () {
        let query = 'SELECT `medical_center`.`id`, `staff`.`rate_full`, `staff`.`rate_occupied` FROM `medical_center`\n' +
            'LEFT JOIN `staff`\n' +
            ' ON `medical_center`.`id` = `staff`.`medical_center_id`\n' +
            'WHERE `medical_center`.`id` = 125';
        const entityManager = typeorm_config_1.default.createEntityManager();
        yield entityManager.query(query).catch((err) => {
            throw err;
        }).then((rows) => __awaiter(void 0, void 0, void 0, function* () {
            // TODO: CHECK all in file
            let rateFullSum = 0;
            let rateOccupiedSum = 0;
            for (const row of rows) {
                rateFullSum += row.rate_full;
                rateOccupiedSum += row.rate_occupied;
            }
            const staffing = Math.floor(rateOccupiedSum / rateFullSum * 100) / 100;
            query = 'UPDATE `medical_center` SET `staffing` = ' + staffing + ' WHERE `medical_center`.`id` = ' + id;
            yield entityManager.query(query).catch((err) => {
                throw err;
            });
            return true;
        }));
    });
    // /api/edit/rate/add
    router.post('/rate/add', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                let date = new Date();
                // @ts-ignore
                date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + '-' + date.getDate();
                const query = "INSERT INTO `staff` (`id`, `medical_center_id`, `date`, `position`, `rate_full`, `rate_occupied`) VALUES (?, ?, ?, ?, ?, ?)";
                try {
                    const result = yield entityManager.query(query, [null, req.body.medical_center_id, date, req.body.position, parseFloat(req.body.rate_full), parseFloat(req.body.rate_occupied)]);
                    res.json(result);
                }
                catch (err) {
                    yield updateRatesInDataBase(req.body.medical_center_id);
                    res.json({
                        success: true
                    });
                }
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
            }
        }
    }));
    // /api/edit/rate/update
    router.post('/rate/update', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                let date = new Date();
                // @ts-ignore
                date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + '-' + date.getDate();
                const query = "UPDATE `staff` SET `date` = ?, `position` = ?, `rate_full` = ?, `rate_occupied` = ? WHERE `staff`.`id` = ?";
                yield entityManager.query(query, [date, req.body.position, req.body.rate_full, req.body.rate_occupied, req.body.id]);
                yield updateRatesInDataBase(req.body.medical_center_id);
                res.json({
                    success: true
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
            }
        }
    }));
    // /api/edit/rate/delete
    router.post('/rate/delete', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                const query = "DELETE FROM `staff` WHERE `staff`.`id` = ?";
                yield entityManager.query(query, [req.body.id]);
                yield updateRatesInDataBase(req.body.medical_center_id);
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
            }
        }
    }));
};
//# sourceMappingURL=edit.routes.js.map