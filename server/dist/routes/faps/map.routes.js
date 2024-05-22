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
    app.use('/map', router);
    // /api/map/
    router.post('/', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const entityManager = typeorm_config_1.default.createEntityManager();
            const query = 'SELECT `medical_center`.`id`, `medical_center`.`name`, `medical_center`.`street`, `medical_center`.`number_of_house`, `medical_center`.`latitude`, `medical_center`.`longitude`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`,  `district`.`id` AS `district_id`, `region`.`name` AS `region_name`,  `medical_center`.`staffing` FROM `medical_center`\n' +
                '    LEFT JOIN `locality`\n' +
                '        ON `medical_center`.`locality_id` = `locality`.`id`\n' +
                '    LEFT JOIN `district`\n' +
                '        ON `locality`.`district_id` = `district`.`id`\n' +
                '    LEFT JOIN `region`\n' +
                '        ON `region`.`id` = `district`.`region_id`' +
                '    ORDER BY `medical_center`.`name`';
            const result = yield entityManager.query(query);
            res.json({ data: result });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
    // /api/map/organizations
    router.post('/organizations', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const entityManager = typeorm_config_1.default.createEntityManager();
            const query = 'SELECT `medical_facility`.`id`, `medical_facility`.`name`, `type_id`,  `medical_facility`.`latitude`, `medical_facility`.`longitude`, `locality_id`, `street`, `number_of_house`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`, `region`.`name` AS `region_name` FROM `medical_facility`\n' +
                'LEFT JOIN `locality`\n' +
                '    ON `medical_facility`.`locality_id` = `locality`.`id`\n' +
                'LEFT JOIN `district`\n' +
                '    ON `locality`.`district_id` = `district`.`id`\n' +
                'LEFT JOIN `region`\n' +
                '    ON `region`.`id` = `district`.`region_id`';
            const result = yield entityManager.query(query);
            res.json({ data: result });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
};
//# sourceMappingURL=map.routes.js.map