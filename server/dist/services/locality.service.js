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
exports.getLocalitiesByDistrictId = void 0;
const typeorm_config_1 = __importDefault(require("../typeorm.config"));
function getLocalitiesByDistrictId(districtId) {
    return __awaiter(this, void 0, void 0, function* () {
        let r;
        const entityManager = typeorm_config_1.default.createEntityManager();
        const query = 'SELECT `locality`.`id`, `locality`.`district_id`, `locality`.`name`, `locality`.`longitude`, `locality`.`latitude`,   (`population`.`population_adult`) AS `population` FROM `locality`\n' +
            'LEFT JOIN `population`\n' +
            ' ON `locality`.`id` = `population`.`locality_id`\n' +
            'WHERE `locality`.`district_id` = ? \n';
        // + 'GROUP BY `locality`.`id`\n' +
        // 'ORDER BY `locality`.`name`'
        try {
            r = yield entityManager.query(query, [districtId]);
        }
        catch (err) {
            return false;
        }
        return r;
    });
}
exports.getLocalitiesByDistrictId = getLocalitiesByDistrictId;
//# sourceMappingURL=locality.service.js.map