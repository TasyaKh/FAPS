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
exports.PointsService = void 0;
const typeorm_config_1 = __importDefault(require("../typeorm.config"));
const conditions_locality_entity_1 = require("../entities/conditions_locality.entity");
const distance_service_1 = require("./distance.service");
const rules_1 = require("./rules");
const points_medical_center_entity_1 = require("../entities/points_medical_center.entity");
const medical_center_service_1 = require("./medical_center.service");
class PointsService {
    createOrUpdateConditionsLocality(user, conditionsLocalityDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const cLRepo = typeorm_config_1.default.getRepository(conditions_locality_entity_1.ConditionsLocality);
            const cLUser = yield cLRepo.findOne({ where: { user: user } });
            if (cLUser) {
                yield this.updateConditionsLocality(cLUser.id, conditionsLocalityDto);
            }
            else {
                yield this.createConditionsLocality(user, conditionsLocalityDto);
            }
        });
    }
    createConditionsLocality(user, conditionsLocalityDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const cLRepo = typeorm_config_1.default.getRepository(conditions_locality_entity_1.ConditionsLocality);
            const query = cLRepo.create(Object.assign({ user: user }, conditionsLocalityDto));
            return yield cLRepo.insert(query);
        });
    }
    updateConditionsLocality(id, conditionsLocalityDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const cLRepo = typeorm_config_1.default.getRepository(conditions_locality_entity_1.ConditionsLocality);
            return yield cLRepo.update(id, Object.assign({}, conditionsLocalityDto));
        });
    }
    getConditionsLocality(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cLRepo = typeorm_config_1.default.getRepository(conditions_locality_entity_1.ConditionsLocality);
            const query = cLRepo.createQueryBuilder("conditions_locality")
                .where("conditions_locality.user_id = :user_id", { user_id: userId });
            return yield query.getOne();
        });
    }
    getSolutionsLocalities(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            // get localities and nearest faps
            const dS = new distance_service_1.DistanceService();
            const lMcs = yield dS.getLocalitiesAndNearMcs(body);
            const existingConditions = yield this.getConditionsLocality(userId);
            // init rules
            const rE = new rules_1.RuleEngine();
            if (existingConditions)
                rE.setConditions(existingConditions);
            rE.initializeRules();
            const result = [];
            if (lMcs)
                for (let i = 0; i < lMcs.length; i++) {
                    const el = lMcs[i];
                    rE.facts = {
                        populationMC: el.mc_population_population_adult,
                        populationNP: el.population_population_adult,
                        staffComposition: el.mc_staffing,
                        facilityType: el.mc_type_name,
                        distanceMc: el.min_distance / 1000 // convert to km
                    };
                    const reEvents = yield rE.runEngine();
                    result.push({ data: el, solutions: reEvents });
                }
            return result;
        });
    }
    // --------------------------------------------------------------------------------------------------------------
    // medical centers
    // --------------------------------------------------------------------------------------------------------------
    getPointsMCS(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const mcRepo = typeorm_config_1.default.getRepository(points_medical_center_entity_1.PointsMedicalCenter);
            const query = mcRepo.createQueryBuilder("points_medical_center")
                .where("points_medical_center.user_id = :user_id", { user_id: userId });
            return yield query.getOne();
        });
    }
    createPointsMCS(user, pMC) {
        return __awaiter(this, void 0, void 0, function* () {
            const mcRepo = typeorm_config_1.default.getRepository(points_medical_center_entity_1.PointsMedicalCenter);
            const query = mcRepo.create(Object.assign({ user: user }, pMC));
            return yield mcRepo.insert(query);
        });
    }
    updatePointsMCS(id, pMC) {
        return __awaiter(this, void 0, void 0, function* () {
            const mcRepo = typeorm_config_1.default.getRepository(points_medical_center_entity_1.PointsMedicalCenter);
            return yield mcRepo.update(id, Object.assign({}, pMC));
        });
    }
    createOrUpdatePointsMCS(user, pMC) {
        return __awaiter(this, void 0, void 0, function* () {
            const mcRepo = typeorm_config_1.default.getRepository(points_medical_center_entity_1.PointsMedicalCenter);
            const cLUser = yield mcRepo.findOne({ where: { user: user } });
            if (cLUser) {
                yield this.updatePointsMCS(cLUser.id, pMC);
            }
            else {
                yield this.createPointsMCS(user, pMC);
            }
        });
    }
    getSolutionsMCS(userId, dto, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingConditions = yield this.getPointsMCS(userId);
            if (!existingConditions) {
                return null;
            }
            else {
                const mcs = yield (0, medical_center_service_1.getMedicalCenters)(Object.assign({}, dto), res);
                let points = [];
                mcs.forEach((mc, index) => {
                    var _a, _b, _c, _d, _e;
                    const p = {};
                    const currYear = new Date().getFullYear();
                    if (currYear - (mc === null || mc === void 0 ? void 0 : mc.founding_year) >= existingConditions.max_found_year)
                        p.foundation_year = Number((existingConditions.foundation_year).toFixed(1));
                    p.staffing = Number(((((1.0 - (mc === null || mc === void 0 ? void 0 : mc.staffing)) * 100) / existingConditions.each_pers_staffing) * existingConditions.staffing)
                        .toFixed(1));
                    p.state = Number((((_a = mc.building_condition) === null || _a === void 0 ? void 0 : _a.state) === 'строится' ? existingConditions.state : 0)
                        .toFixed(1));
                    p.adult_population = Number((((_c = (_b = mc.locality) === null || _b === void 0 ? void 0 : _b.population) === null || _c === void 0 ? void 0 : _c.population_adult) * existingConditions.adult_population)
                        .toFixed(1));
                    p.child_population = Number((((_e = (_d = mc.locality) === null || _d === void 0 ? void 0 : _d.population) === null || _e === void 0 ? void 0 : _e.population_child) * existingConditions.child_population)
                        .toFixed(1));
                    p.sum = p.foundation_year + p.staffing + p.state + p.adult_population + p.child_population;
                    p.mc = mc;
                    points.push(p);
                });
                // sort ASC|DESC
                dto.mc_population_adult_order ? points = this.sortSolutionsMCSByASCDesc(points, "adult_population", dto.mc_population_adult_order) : null;
                dto.mc_population_child_order ? points = this.sortSolutionsMCSByASCDesc(points, "child_population", dto.mc_population_child_order) : null;
                dto.foundation_year_order ? points = this.sortSolutionsMCSByASCDesc(points, "foundation_year", dto.foundation_year_order) : null;
                dto.mc_staffing_order ? points = this.sortSolutionsMCSByASCDesc(points, "staffing", dto.mc_staffing_order) : null;
                dto.sum_order ? points = this.sortSolutionsMCSByASCDesc(points, "sum", dto.sum_order) : null;
                return points;
            }
        });
    }
    // Function to sort points array by adult_population with direction
    sortSolutionsMCSByASCDesc(points, field = "adult_population", direction = 'ASC') {
        return points.sort((a, b) => {
            var _a, _b;
            let aValue = (_a = a[field]) !== null && _a !== void 0 ? _a : 0;
            let bValue = (_b = b[field]) !== null && _b !== void 0 ? _b : 0;
            if (isNaN(aValue))
                aValue = 0;
            if (isNaN(bValue))
                bValue = 0;
            if (direction === 'ASC') {
                return aValue - bValue;
            }
            else {
                return bValue - aValue;
            }
        });
    }
}
exports.PointsService = PointsService;
//# sourceMappingURL=points.service.js.map