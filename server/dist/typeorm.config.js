"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const db_connection_1 = __importDefault(require("./db.connection"));
const building_condition_entity_1 = __importDefault(require("./entities/building_condition.entity"));
const conditions_locality_entity_1 = require("./entities/conditions_locality.entity");
const distance_entity_1 = __importDefault(require("./entities/distance.entity"));
const district_entity_1 = __importDefault(require("./entities/district.entity"));
const locality_entity_1 = __importDefault(require("./entities/locality.entity"));
const medical_center_entity_1 = __importDefault(require("./entities/medical_center.entity"));
const medical_facility_entity_1 = require("./entities/medical_facility.entity");
const points_deterioration_entity_1 = require("./entities/points_deterioration.entity");
const points_medical_center_entity_1 = require("./entities/points_medical_center.entity");
const population_entity_1 = require("./entities/population.entity");
const region_entity_1 = require("./entities/region.entity");
const user_entity_1 = require("./entities/user.entity");
const staff_entity_1 = require("./entities/staff.entity");
const types_entity_1 = require("./entities/types.entity");
const AppDataSource = new typeorm_1.DataSource(Object.assign(Object.assign({}, db_connection_1.default), { entities: [building_condition_entity_1.default, conditions_locality_entity_1.ConditionsLocality, distance_entity_1.default, district_entity_1.default, locality_entity_1.default,
        medical_center_entity_1.default, medical_facility_entity_1.MedicalFacility, points_deterioration_entity_1.PointsDeterioration,
        points_medical_center_entity_1.PointsMedicalCenter, population_entity_1.Population, region_entity_1.Region, staff_entity_1.Staff, types_entity_1.Type, user_entity_1.User] }));
exports.default = AppDataSource;
//# sourceMappingURL=typeorm.config.js.map
