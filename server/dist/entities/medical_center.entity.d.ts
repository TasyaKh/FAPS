import Locality from "./locality.entity";
import { MedicalFacility } from "./medical_facility.entity";
import { Type } from "./types.entity";
import BuildingCondition from "./building_condition.entity";
export default class MedicalCenter {
    id: number;
    locality_id: number;
    medical_facility_id: number;
    type_id: number;
    name: string;
    street: string;
    number_of_house: string;
    phone: string;
    latitude: number;
    longitude: number;
    pharmacy: boolean;
    founding_year: number;
    availability_of_emergency_mediical_care: boolean;
    access_to_primary_health_care: boolean;
    staffing: number;
    locality: Locality;
    building_condition: BuildingCondition;
    medical_facility: MedicalFacility;
    type: Type;
}
