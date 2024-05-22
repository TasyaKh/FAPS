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
const locality_entity_1 = __importDefault(require("../../entities/locality.entity"));
const auth_service_1 = require("../../services/auth.service");
const roles_1 = require("../../roles");
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/location', router);
    // /api/location/regions
    router.post('/regions', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const entityManager = typeorm_config_1.default.createEntityManager();
            const result = yield entityManager.query('SELECT `region`.`id`, `region`.`name`, COUNT(`district`.`id`) AS `districts_count` FROM `region`\n' +
                'LEFT JOIN `district` \n' +
                '\tON `region`.`id` = `district`.`region_id` \n' +
                'GROUP BY `region`.`id`\n' +
                'ORDER BY `region`.`name`');
            res.json(result);
        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
    // /api/location/districts
    router.post('/districts', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const entityManager = typeorm_config_1.default.createEntityManager();
            let query;
            if (req.body.id) {
                query = 'SELECT `district`.`id`, `district`.`name`, `locality`.`longitude`, `locality`.`latitude`, `district`.`region_id`, COUNT(`locality`.`id`) AS `localities_count` FROM `district`\n' +
                    'LEFT JOIN `locality`\n' +
                    '\tON `district`.`id` = `locality`.`district_id`\n' +
                    'WHERE `district`.`region_id` = ' + req.body.id + '\n' +
                    'GROUP BY `district`.`id`\n' +
                    'ORDER BY `district`.`name`';
            }
            else {
                query = 'SELECT `district`.`id`, `district`.`name`, `locality`.`longitude`, `locality`.`latitude`, `district`.`region_id`, COUNT(`locality`.`id`) AS `localities_count` FROM `district`\n' +
                    'LEFT JOIN `locality`\n' +
                    '\tON `district`.`id` = `locality`.`district_id`\n' +
                    'GROUP BY `district`.`id`\n' +
                    'ORDER BY `district`.`name`';
            }
            const result = yield entityManager.query(query);
            res.json(result);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
    // /api/location/localities
    router.post('/localities', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const entityManager = typeorm_config_1.default.createEntityManager();
            let query;
            if (req.body.id) {
                query = 'SELECT `locality`.`id`, `locality`.`district_id`, `locality`.`longitude`, `locality`.`latitude`, `locality`.`name`, (`population`.`population_adult`) AS `population` FROM `locality`\n' +
                    'LEFT JOIN `population`\n' +
                    ' ON `locality`.`id` = `population`.`locality_id`\n' +
                    'WHERE `locality`.`district_id` = ' + req.body.id + '\n' +
                    'GROUP BY `locality`.`id`\n' +
                    'ORDER BY `locality`.`name`';
            }
            else {
                query = 'SELECT `locality`.`id`, `locality`.`district_id`, `locality`.`longitude`, `locality`.`latitude`, `locality`.`name`, (`population`.`population_adult`) AS `population` FROM `locality`\n' +
                    'LEFT JOIN `population`\n' +
                    ' ON `locality`.`id` = `population`.`locality_id`\n' +
                    'GROUP BY `locality`.`name`\n' +
                    'ORDER BY `locality`.`name`';
            }
            const result = yield entityManager.query(query);
            res.json(result);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
    // /api/location/locality/:id
    router.post('/locality/:id', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const entityManager = typeorm_config_1.default.getRepository(locality_entity_1.default);
            let query = entityManager.createQueryBuilder('locality')
                .select(['locality.id', 'locality.district_id', 'locality.longitude', 'locality.latitude',
                'locality.name', 'population.population_adult', 'population.population_child',
                'district.name'])
                .leftJoin('locality.population', 'population')
                .leftJoin('locality.district', 'district')
                .groupBy('locality.id')
                .orderBy('locality.name', 'DESC');
            req.params.id ?
                query.where('locality.id = :locality_id', { locality_id: req.params.id }) : query;
            res.json(yield query.getOne());
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
    // --- Update block
    // /api/location/update/district
    router.post('/update/district', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                const query = "UPDATE `district` SET `region_id` = " + req.body.region_id + ", `name` = '" + req.body.name + "' WHERE `district`.`id` = " + req.body.id;
                const result = yield entityManager.query(query);
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
    // /api/location/update/locality
    router.post('/update/locality', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                const query = "UPDATE `locality` SET `district_id` = '" + req.body.district_id + "', `name` = '" + req.body.name + "' WHERE `locality`.`id` = " + req.body.id;
                const result = yield entityManager.query(query);
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
    // /api/location/update/region
    router.post('/update/region', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                const query = "UPDATE `region` SET `name` = '" + req.body.name + "' WHERE `region`.`id` = " + req.body.id;
                const result = yield entityManager.query(query);
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
    // --- Add block
    // /api/location/add/district
    router.post('/add/district', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                const query = "INSERT INTO `district` (`id`, `region_id`, `name`) VALUES (NULL, " + req.body.region_id + ", '" + req.body.name + "')";
                const result = yield entityManager.query(query);
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
    // /api/location/add/locality
    router.post('/add/locality', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                const query = "INSERT INTO `locality` (`id`, `district_id`, `name`) VALUES (NULL, " + req.body.district_id + ", '" + req.body.name + "')";
                const result = yield entityManager.query(query);
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
    // /api/location/add/region
    router.post('/add/region', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                const query = "INSERT INTO `region` (`id`, `name`) VALUES (NULL, '" + req.body.name + "')";
                const result = yield entityManager.query(query);
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
    // --- Remove block
    // /api/location/delete/district
    router.post('/delete/district', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                const query = "DELETE FROM `district` WHERE `district`.`id` = " + req.body.id;
                const result = yield entityManager.query(query);
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
    // /api/location/delete/locality
    router.post('/delete/locality', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                const query = "DELETE FROM `locality` WHERE `locality`.`id` = " + req.body.id;
                const result = yield entityManager.query(query);
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
    // /api/location/delete/region
    router.post('/delete/region', auth_service_1.verifyUserToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const granted = (0, auth_service_1.checkUserRoleOrErr)(req, res, roles_1.Roles.EXPERT);
        if (granted) {
            try {
                const entityManager = typeorm_config_1.default.createEntityManager();
                const query = "DELETE FROM `region` WHERE `region`.`id` = " + req.body.id;
                const result = yield entityManager.query(query);
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
};
//# sourceMappingURL=location.routes.js.map