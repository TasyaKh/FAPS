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
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/map/org', router);
    // /api/map/org
    router.post('/', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.body.id;
            const entityManager = typeorm_config_1.default.createEntityManager();
            const query = 'SELECT `medical_facility`.`id`, `medical_facility`.`name`, `medical_facility`.`street`, `medical_facility`.`number_of_house`, `medical_facility`.`phone`, `medical_facility`.`organization`, `medical_facility`.`ogrn`, `medical_facility`.`kpp`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`, `region`.`name` AS `region_name`, `types`.`name` AS `type_name` FROM `medical_facility`\n' +
                'LEFT JOIN `locality`\n' +
                '    ON `medical_facility`.`locality_id` = `locality`.`id`\n' +
                'LEFT JOIN `district`\n' +
                '    ON `locality`.`district_id` = `district`.`id`\n' +
                'LEFT JOIN `region`\n' +
                '    ON `region`.`id` = `district`.`region_id`\n' +
                'LEFT JOIN `types`\n' +
                '    ON `medical_facility`.`type_id` = `types`.`id`\n' +
                'WHERE `medical_facility`.`id` = ' + id;
            const result = yield entityManager.query(query);
            res.json(result[0]);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
    // /api/map/org/objects
    router.post('/objects', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.body.id;
            const entityManager = typeorm_config_1.default.createEntityManager();
            const query = 'SELECT `medical_center`.`id`, `medical_center`.`name`, `medical_center`.`street`, `medical_center`.`latitude` , `medical_center`.`longitude`, `medical_center`.`number_of_house`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`, `region`.`name` AS `region_name`, `staffing` FROM `medical_center`\n' +
                'LEFT JOIN `locality`\n' +
                '    ON `medical_center`.`locality_id` = `locality`.`id`\n' +
                'LEFT JOIN `district`\n' +
                '    ON `locality`.`district_id` = `district`.`id`\n' +
                'LEFT JOIN `region`\n' +
                '    ON `region`.`id` = `district`.`region_id`\n' +
                'WHERE `medical_facility_id` = ' + id;
            const result = yield entityManager.query(query);
            res.json(result);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
};
//# sourceMappingURL=org.routes.js.map