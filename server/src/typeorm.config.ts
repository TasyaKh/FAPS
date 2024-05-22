import {DataSource} from 'typeorm';
import CONNECTION from "./db.connection";
import BuildingCondition from "./entities/building_condition.entity";
import {ConditionsLocality} from "./entities/conditions_locality.entity";
import Distance from "./entities/distance.entity";
import District from "./entities/district.entity";
import Locality from "./entities/locality.entity";
import MedicalCenter from "./entities/medical_center.entity";
import {MedicalFacility} from "./entities/medical_facility.entity";
import {PointsDeterioration} from "./entities/points_deterioration.entity";
import {PointsMedicalCenter} from "./entities/points_medical_center.entity";
import {Population} from "./entities/population.entity";
import {Region} from "./entities/region.entity";
import {User} from "./entities/user.entity";
import {Staff} from "./entities/staff.entity";
import {Type} from "./entities/types.entity";

const AppDataSource = new DataSource({
    ...CONNECTION,
    entities: [BuildingCondition, ConditionsLocality, Distance, District, Locality,
        MedicalCenter, MedicalFacility, PointsDeterioration,
        PointsMedicalCenter, Population, Region, Staff, Type, User],
    // migrations: ['src/migrations/*.ts'],
    // entities: ['dist/entities/*.entity.js'],
    // migrations: ['dist/migrations/*.js'],
});

export default AppDataSource;
