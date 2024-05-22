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
    app.use('/detail', router);
    // /api/detail/:id
    router.get('/:id', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.params.id === undefined || req.params.id === null) {
                res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
                return;
            }
            const entityManager = typeorm_config_1.default.createEntityManager();
            const query = 'SELECT `medical_center`.`name`, `medical_center`.`staffing`, `medical_center`.`type_id` , `medical_center`.`latitude`, `medical_center`.`longitude`, `medical_center`.`phone`, `medical_center`.`founding_year`, `availability_of_emergency_mediical_care`, `access_to_primary_health_care`, `pharmacy`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`, `region`.`name` AS `region_name`, `medical_center`.`street`, `medical_center`.`number_of_house`, `medical_center`.`id`, `region`.`id` AS `region_id`, `district`.`id` AS `district_id`, `locality`.`id` AS `locality_id`, `medical_facility`.`name` AS `facility_name`, `medical_facility_id`, `types`.`name` AS `type_name`, `medical_facility`.`name` AS `parent`, `population`.`population_adult`, `population`.`population_child` FROM `medical_center`\n' +
                'LEFT JOIN `locality`\n' +
                '    ON `medical_center`.`locality_id` = `locality`.`id`\n' +
                'LEFT JOIN `district`\n' +
                '    ON `locality`.`district_id` = `district`.`id`\n' +
                'LEFT JOIN `region`\n' +
                '    ON `region`.`id` = `district`.`region_id`\n' +
                'LEFT JOIN `medical_facility`\n' +
                '    ON `medical_center`.`medical_facility_id` =  `medical_facility`.`id`\n' +
                'LEFT JOIN `types`\n' +
                '    ON `medical_center`.`type_id` = `types`.`id`\n' +
                'LEFT JOIN `population`\n' +
                '    ON `locality`.`id` = `population`.`locality_id`\n' +
                'WHERE `medical_center`.`id` = ' + req.params.id;
            const result = yield entityManager.query(query);
            res.json(result);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
    // /api/images/:id
    router.get('/images/:id', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.params.id === undefined || req.params.id === null) {
                res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
                return;
            }
            const entityManager = typeorm_config_1.default.createEntityManager();
            const query = 'SELECT * FROM `photo` WHERE `medical_center_id` = ' + req.params.id + ' ORDER BY `photo`.`id` DESC';
            const result = yield entityManager.query(query);
            res.json(result);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
    // /api/rates/:id
    router.get('/rates/:id', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.params.id === undefined || req.params.id === null) {
                res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
                return;
            }
            const entityManager = typeorm_config_1.default.createEntityManager();
            const query = 'SELECT * FROM `staff` WHERE `medical_center_id` = ' + req.params.id + ' ORDER BY `staff`.`date` DESC';
            const result = yield entityManager.query(query);
            res.json(result);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
    // api/detail/delete
    router.post('/delete', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                const query = 'DELETE FROM `medical_center` WHERE `medical_center`.`id` = ' + req.body.id;
                const result = yield entityManager.query(query);
                res.json(result);
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
            }
        }
    }));
    // api/detail/update
    router.post('/update', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                const query = "UPDATE `medical_center` SET `locality_id` = ?, `medical_facility_id` = ?, `type_id` = ?, `name` = ?, `street` = ?, `number_of_house` = ?, `phone` = ?, `latitude` = ?, `longitude` = ?, `pharmacy` = ?, `founding_year` = ?, `availability_of_emergency_mediical_care` = ?, `access_to_primary_health_care` = ?, `founding_year` = ? WHERE `medical_center`.`id` = ?";
                const data = [req.body.locality_id, req.body.medical_facility_id, req.body.type_id, req.body.name, req.body.street, req.body.number_of_house, req.body.phone, req.body.latitude, req.body.longitude, req.body.pharmacy, null, req.body.availability_of_emergency_mediical_care, req.body.access_to_primary_health_care, req.body.founding_year, req.body.id];
                const result = yield entityManager.query(query, data);
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
    // api/detail/add
    router.post('/add', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                if (req.body.phone) {
                    req.body.phone = req.body.phone.substr(0, 11);
                }
                if (req.body.founding_year) {
                    req.body.founding_year = req.body.founding_year.substr(0, 4);
                }
                if (req.body.medical_facility_id === 0) {
                    req.body.medical_facility_id = null;
                }
                const query = "INSERT INTO `medical_center` (`id`, `locality_id`, `medical_facility_id`, `type_id`, `name`, `street`, `number_of_house`, `phone`, `latitude`, `longitude`, `pharmacy`, `founding_year`, `availability_of_emergency_mediical_care`, `access_to_primary_health_care`, `staffing`) VALUES (?);";
                const data = [null, req.body.locality_id, req.body.medical_facility_id, req.body.type_id, req.body.name, req.body.street, req.body.number_of_house, req.body.phone, req.body.latitude, req.body.longitude, req.body.pharmacy, req.body.founding_year, req.body.availability_of_emergency_mediical_care, req.body.access_to_primary_health_care, null];
                const result = yield entityManager.query(query, data);
                // TODO: CHECK  connection.query(query, [data], (err, rows)
                res.json({
                    success: true,
                    id: result.insertId
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
            }
        }
    }));
};
//# sourceMappingURL=detail.routes.js.map