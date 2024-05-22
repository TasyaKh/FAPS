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
const normalizeData_js_1 = require("../../functions/normalizeData.js");
const mappings_js_1 = __importDefault(require("../../mappings.js"));
const typeorm_config_1 = __importDefault(require("../../typeorm.config"));
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/view', router);
    // /api/view/
    router.post('/', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const entityManager = typeorm_config_1.default.createEntityManager();
            const query = 'SELECT `medical_center`.`name`, `founding_year`, `availability_of_emergency_mediical_care`, `access_to_primary_health_care`, `pharmacy`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`, `region`.`name` AS `region_name`, `street`, `number_of_house`, `medical_center`.`id`, `population`.`population_adult` AS `population` FROM `medical_center`\n' +
                'LEFT JOIN `locality`\n' +
                '        ON `medical_center`.`locality_id` = `locality`.`id`\n' +
                'LEFT JOIN `district`\n' +
                '        ON `locality`.`district_id` = `district`.`id`\n' +
                'LEFT JOIN `region`\n' +
                '        ON `region`.`id` = `district`.`region_id`\n' +
                'LEFT JOIN `population`\n' +
                '        ON `population`.`id` = (SELECT `p`.`id` FROM `population` AS `p` WHERE `p`.`locality_id` = `locality`.`id` ORDER BY `p`.`year` ASC LIMIT 1)' +
                'ORDER BY `medical_center`.`name`';
            const result = yield entityManager.query(query).then((rows) => {
                if (rows.length === 0) {
                    res.json({
                        objects: [],
                        headers: []
                    });
                    return;
                }
                (0, normalizeData_js_1.normalizeData)(rows, true);
                const headers = [];
                for (const key of Object.keys(rows[0])) {
                    for (const mapping of mappings_js_1.default) {
                        if (key === mapping.queryName || key === mapping.fullQueryName) {
                            headers.push(mapping.columnName);
                        }
                    }
                }
                res.json({
                    data: rows,
                    headers
                });
            });
            res.json(result);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
};
//# sourceMappingURL=view.routes.js.map