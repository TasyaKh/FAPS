import MedicalCenter from "../entities/medical_center.entity";
export declare class PointsMedicalCenterDto {
    adult_population?: number;
    child_population?: number;
    max_found_year?: number;
    foundation_year?: number;
    staffing?: number;
    state?: number;
    each_pers_staffing?: number;
}
export declare class SolutionsMCS {
    mc?: MedicalCenter;
    adult_population?: number;
    child_population?: number;
    foundation_year?: number;
    staffing?: number;
    state?: number;
    sum?: number;
}
export declare class MedicalCenterDto {
    region_id?: number;
    district_id?: number;
}
