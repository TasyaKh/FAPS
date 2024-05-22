import MedicalCenter from "./medical_center.entity";
export declare class Staff {
    id: number;
    medical_center_id: number;
    date: Date;
    position: string;
    rate_full: number;
    rate_occupied: number;
    medical_center: MedicalCenter;
}
