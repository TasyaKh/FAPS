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
exports.DistanceService = void 0;
const typeorm_config_1 = __importDefault(require("../typeorm.config"));
const distance_entity_1 = __importDefault(require("../entities/distance.entity"));
const locality_entity_1 = __importDefault(require("../entities/locality.entity"));
const medical_center_entity_1 = __importDefault(require("../entities/medical_center.entity"));
const medical_facility_entity_1 = require("../entities/medical_facility.entity");
const types_entity_1 = require("../entities/types.entity");
const population_entity_1 = require("../entities/population.entity");
class DistanceService {
    saveDistance(distance) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = typeorm_config_1.default.createEntityManager();
            yield this.delDistanceIfExists(distance);
            const query = `INSERT INTO distance (
        distance, duration, locality_id, mc_id, mc_facility_id) 
        VALUES (?, ?, ?, ?, ?)`;
            try {
                return yield entityManager.query(query, distance.getArray());
            }
            catch (err) {
                return false;
            }
        });
    }
    // получить расстояния до мед учреждений по заданым параметрам
    getDistToMc(res, distance) {
        return __awaiter(this, void 0, void 0, function* () {
            const distRepository = typeorm_config_1.default.getRepository(distance_entity_1.default);
            let distances;
            try {
                let query = distRepository.createQueryBuilder('distance')
                    .select(['distance.id', 'distance.duration', 'distance.distance', 'mc.id', 'mc.name', 'mc.staffing',
                    'mc.longitude', 'mc.latitude'])
                    .leftJoin('distance.medical_center', 'mc')
                    .where('distance.mc_id IS NOT NULL')
                    .limit(distance.limit)
                    .orderBy(' distance.distance', 'ASC');
                distance.locality_id ? query.andWhere('distance.locality_id = :locality_id', { locality_id: distance.locality_id }) : query;
                distances = yield query.getMany();
            }
            catch (err) {
                res.status(500).json({ error: err });
            }
            return distances;
        });
    }
    // Удалить существующие записи
    delDistanceIfExists(distance) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            const entityManager = typeorm_config_1.default.createEntityManager();
            // del Existig Localities
            const query = `DELETE FROM distance
        WHERE locality_id = ? and ((mc_id = ? and mc_id is not null)
         or (mc_facility_id = ? and mc_facility_id is not null))`;
            try {
                res = yield entityManager.query(query, [
                    distance.locality_id, distance.mc_id, distance.mc_facility_id
                ]);
            }
            catch (err) {
                console.log(err, distance);
                return false;
            }
            return res;
        });
    }
    getLocalitiesAndNearMcs(locsAndNearMcsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const localityRepository = typeorm_config_1.default.getRepository(locality_entity_1.default);
                let query = localityRepository
                    .createQueryBuilder('locality')
                    .select([
                    'locality.id',
                    'locality.district_id',
                    'locality.longitude',
                    'locality.latitude',
                    'locality.name',
                    'population.id',
                    'population.population_adult',
                    'population.population_child',
                    'COALESCE(dtmc.distance, 0) AS min_distance',
                    'dtmc.duration AS min_duration',
                    'mc.id AS mc_id',
                    'mc.longitude AS mc_longitude',
                    'mc.latitude AS mc_latitude',
                    'mc.name AS medical_center_name',
                    'mc.staffing AS mc_staffing',
                    'mc_type.name',
                    'mc_locality.id',
                    'mc_population.population_adult',
                    'mcf.id AS mcf_id',
                    'mcf.longitude AS mcf_longitude',
                    'mcf.latitude AS mcf_latitude',
                    'mcf.name AS mcf_name',
                    'mcf_type.name',
                    'dtmcf.distance AS min_facility_distance',
                    'dtmcf.duration AS min_facility_duration',
                ])
                    .leftJoin('locality.population', 'population')
                    .leftJoin(subQuery => {
                    return subQuery
                        .select(['locality_id', 'MIN(distance) AS min_distance'])
                        .from(distance_entity_1.default, 'distance')
                        .where('mc_id IS NOT NULL AND mc_facility_id IS NULL')
                        .groupBy('locality_id');
                }, 'md', 'md.locality_id = locality.id')
                    // medical center
                    .leftJoin(distance_entity_1.default, 'dtmc', 'dtmc.locality_id = locality.id AND dtmc.distance = md.min_distance')
                    .leftJoin(medical_center_entity_1.default, 'mc', 'mc.id = dtmc.mc_id')
                    .leftJoin(types_entity_1.Type, 'mc_type', 'mc_type.id = mc.type_id')
                    .leftJoin(locality_entity_1.default, 'mc_locality', 'mc_locality.id = mc.locality_id')
                    .leftJoin(population_entity_1.Population, 'mc_population', 'mc_locality.id = mc_population.locality_id')
                    .leftJoin(subQuery => {
                    return subQuery
                        .select(['locality_id', 'MIN(distance) AS min_distance'])
                        .from(distance_entity_1.default, 'distance')
                        .where('mc_facility_id IS NOT NULL AND mc_id IS NULL')
                        .groupBy('locality_id');
                }, 'mfd', 'mfd.locality_id = locality.id')
                    // medical organization
                    .leftJoin(distance_entity_1.default, 'dtmcf', 'dtmcf.locality_id = locality.id AND dtmcf.distance = mfd.min_distance')
                    .leftJoin(medical_facility_entity_1.MedicalFacility, 'mcf', 'mcf.id = dtmcf.mc_facility_id')
                    .leftJoin(types_entity_1.Type, 'mcf_type', 'mcf_type.id = mcf.type_id');
                query = this.filterLocalitiesAndNearMcs(query, locsAndNearMcsDto);
                return query.getRawMany();
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    filterLocalitiesAndNearMcs(query, dto) {
        // district_id
        if (dto.district_id) {
            query.andWhere('locality.district_id = :district_id', { district_id: dto.district_id });
            // region_id
        }
        else if (dto.region_id) {
            query.leftJoin('locality.district', 'district')
                .andWhere('district.region_id = :region_id', { region_id: dto.region_id });
        }
        // population_id
        if (dto.population_id)
            switch (Number(dto.population_id)) {
                case 1:
                    query.andWhere('population.population_adult < 100');
                    break;
                case 2:
                    query.andWhere('population.population_adult >= 100 AND population.population_adult <=300');
                    break;
                case 3:
                    query.andWhere('population.population_adult > 300 AND population.population_adult <=1000');
                    break;
                case 4:
                    query.andWhere('population.population_adult > 1000 AND population.population_adult <=2000');
                    break;
                case 5:
                    query.andWhere('population.population_adult > 2000');
                    break;
            }
        // search
        dto.search ?
            query.andWhere('LOWER(locality.name) LIKE :name', { name: `%${dto.search}%` })
            : null;
        // ORDERS
        // population_population_adult_order
        dto.locality_name_order ? query.orderBy('locality.name', dto.locality_name_order) : query;
        // population_population_adult_order
        dto.population_population_adult_order ? query.orderBy('population.population_adult', dto.population_population_adult_order) : query;
        // medical_center_name_order
        dto.medical_center_name_order ? query.orderBy('mc.name', dto.medical_center_name_order) : query;
        // mc_staffing_order
        dto.mc_staffing_order ? query.orderBy('mc.staffing', dto.mc_staffing_order) : query;
        // mc_type_name_order
        dto.mc_type_name_order ? query.orderBy('mc_type.name', dto.mc_type_name_order) : query;
        // min_distance_order
        dto.min_distance_order ? query.orderBy('dtmc.distance', dto.min_distance_order) : query;
        // min_duration_order
        dto.min_duration_order ? query.orderBy('dtmc.duration', dto.min_duration_order) : query;
        return query;
    }
}
exports.DistanceService = DistanceService;
//# sourceMappingURL=distance.service.js.map