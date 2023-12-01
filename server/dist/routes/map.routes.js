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
import { initializeConnection } from '../functions/initializeConnection.js';
const router = Router();
const configDB = {
    host: config.get('host'),
    user: config.get('user'),
    password: config.get('password'),
    port: config.get('portDB'),
    database: config.get('database'),
    charset: 'utf8'
};
// /api/map/
router.post('/', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = initializeConnection(configDB);
        const query = 'SELECT `medical_center`.`id`, `medical_center`.`name`, `medical_center`.`street`, `medical_center`.`number_of_house`, `medical_center`.`latitude`, `medical_center`.`longitude`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`, `region`.`name` AS `region_name`,  `medical_center`.`staffing` FROM `medical_center`\n' +
            '    LEFT JOIN `locality`\n' +
            '        ON `medical_center`.`locality_id` = `locality`.`id`\n' +
            '    LEFT JOIN `district`\n' +
            '        ON `locality`.`district_id` = `district`.`id`\n' +
            '    LEFT JOIN `region`\n' +
            '        ON `region`.`id` = `district`.`region_id`' +
            '    ORDER BY `medical_center`.`name`';
        connection.query(query, (err, rows) => {
            connection.end();
            if (err) {
                throw err;
            }
            res.json({ data: rows });
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
}));
// /api/map/organizations
router.post('/organizations', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = initializeConnection(configDB);
        const query = 'SELECT `medical_facility`.`id`, `medical_facility`.`name`, `type_id`,  `latitude`, `longitude`, `locality_id`, `street`, `number_of_house`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`, `region`.`name` AS `region_name` FROM `medical_facility`\n' +
            'LEFT JOIN `locality`\n' +
            '    ON `medical_facility`.`locality_id` = `locality`.`id`\n' +
            'LEFT JOIN `district`\n' +
            '    ON `locality`.`district_id` = `district`.`id`\n' +
            'LEFT JOIN `region`\n' +
            '    ON `region`.`id` = `district`.`region_id`';
        connection.query(query, (err, rows) => {
            connection.end();
            if (err) {
                throw err;
            }
            res.json({ data: rows });
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
}));
export default router;
//# sourceMappingURL=map.routes.ts.map