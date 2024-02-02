import {Order} from "../enums";

export interface ILocalitiDistToNearectMC{

    locality_id?: number,
    locality_district_id?: number,
    locality_name?: string,
    locality_latitude?: number,
    locality_longitude?: number,
    population_id?: number,
    population_population_adult?: number,
    population_population_child?: number,
    mc_type_name?: string,
    mc_locality_id?: number,
    mc_population_population_adult?: number,
    mcf_type_name?: string,
    min_distance?: number,
    min_duration?: number,
    mc_id?: number,
    mc_longitude?: number,
    mc_latitude?: number,
    medical_center_name?: string,
    mc_staffing?: number,
    mcf_id?: number,
    mcf_longitude?: number,
    mcf_latitude?: number,
    mcf_name?: string,
    min_facility_distance?: number,
    min_facility_duration?: number

    region_id?:number;
    district_id?:number;

    // order
    locality_name_order?: Order,
    population_population_adult_order?: Order,
    medical_center_name_order?: Order,
    mc_staffing_order?: Order,
    mc_type_name_order?: Order,
    min_distance_order?: Order,
    min_duration_order?: Order
}

export interface ICustomSolutionsLocalities{
    data?:ILocalitiDistToNearectMC,
    solutions?:string[]
}

export interface IConditionsLocality{
    min_dist_mc?: number;
    population_FAP?: number;
    population_Ambulatory?: number;
}

export interface IUser{
    nameEmail?: string;
    password?: string;
}
