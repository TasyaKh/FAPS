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
exports.getMedicalCenters = void 0;
const typeorm_config_1 = __importDefault(require("../typeorm.config"));
const medical_center_entity_1 = __importDefault(require("../entities/medical_center.entity"));
function getMedicalCenters(mc, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mcRepo = typeorm_config_1.default.getRepository(medical_center_entity_1.default);
            const query = mcRepo.createQueryBuilder('medical_center')
                .leftJoinAndSelect('medical_center.locality', 'locality')
                .leftJoinAndSelect('locality.population', 'population')
                .leftJoinAndSelect('locality.district', 'district')
                .leftJoinAndSelect('medical_center.building_condition', 'building_condition');
            if (mc.district_id) {
                query.andWhere('district.id = :district_id', { district_id: mc.district_id });
            }
            if (mc.region_id) {
                query.leftJoinAndSelect('district.region', 'region')
                    .andWhere('region.id = :region_id', { region_id: mc.region_id });
            }
            let res = yield query.getMany();
            return res;
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    });
}
exports.getMedicalCenters = getMedicalCenters;
//# sourceMappingURL=medical_center.service.js.map