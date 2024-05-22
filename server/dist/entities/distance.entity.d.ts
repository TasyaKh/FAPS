import Locality from "./locality.entity";
import MedicalCenter from "./medical_center.entity";
import { MedicalFacility } from "./medical_facility.entity";
export default class Distance {
    id: number;
    distance: number;
    duration: number;
    locality_id: number;
    mc_id: number;
    mc_facility_id: number;
    locality: Locality;
    medical_center: MedicalCenter;
    medical_facility: MedicalFacility;
}
