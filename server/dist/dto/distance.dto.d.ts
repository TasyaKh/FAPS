import { IMessages } from "../services/rules";
export declare class DistanceDto {
    distance?: number;
    duration?: number;
    locality_id?: number;
    mc_id?: number;
    mc_facility_id?: number;
    limit: number;
    getArray(): number[];
}
export declare class LocalitiesAndNearMcsDto {
    region_id?: number;
    district_id?: number;
    population_id?: number;
    search?: string;
    locality_name_order?: "ASC" | "DESC";
    population_population_adult_order?: "ASC" | "DESC";
    medical_center_name_order?: "ASC" | "DESC";
    mc_staffing_order?: "ASC" | "DESC";
    mc_type_name_order?: "ASC" | "DESC";
    min_distance_order?: "ASC" | "DESC";
    min_duration_order?: "ASC" | "DESC";
}
export declare class LocalitiDistToNearectMC {
    locality_id?: number;
    locality_district_id?: number;
    locality_name?: string;
    locality_latitude?: number;
    locality_longitude?: number;
    population_id?: number;
    population_population_adult?: number;
    population_population_child?: number;
    mc_type_name?: string;
    mc_locality_id?: number;
    mc_population_population_adult?: number;
    mcf_type_name?: string;
    min_distance?: number;
    min_duration?: number;
    mc_id?: number;
    mc_longitude?: number;
    mc_latitude?: number;
    medical_center_name?: string;
    mc_staffing?: number;
    mcf_id?: number;
    mcf_longitude?: number;
    mcf_latitude?: number;
    mcf_name?: string;
    min_facility_distance?: number;
    min_facility_duration?: number;
}
export declare class CustomSolutionsLocalities {
    data?: LocalitiDistToNearectMC;
    solutions?: IMessages[];
}
