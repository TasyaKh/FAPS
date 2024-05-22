import MedicalCenter from "./medical_center.entity";
export default class BuildingCondition {
    id: number;
    state: string;
    deteroation: number;
    medical_center: MedicalCenter;
}
