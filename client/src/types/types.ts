import {Order} from "../enums";

// --------------------------------------------------------------------------------------------------------------
// addition
// --------------------------------------------------------------------------------------------------------------
export interface ILocalitiDistToNearectMC {

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

    region_id?: number;
    district_id?: number;

    // order
    search?: string
    locality_name_order?: Order,
    population_population_adult_order?: Order,
    medical_center_name_order?: Order,
    mc_staffing_order?: Order,
    mc_type_name_order?: Order,
    min_distance_order?: Order,
    min_duration_order?: Order
}

export interface ISolutionsMCS {
    mc: IMedicalCenter

    adult_population?: number
    child_population?: number
    foundation_year?: number
    staffing?: number
    state?: number

    sum?: number
}

export interface IMessages {
    key: string,
    name: string
}

export interface ICustomSolutionsLocalities {
    data?: ILocalitiDistToNearectMC,
    solutions?: IMessages[]
}

export interface IConditionsLocality {
    min_dist_mc?: number;
    population_FAP?: number;
    population_Ambulatory?: number;
}

export interface IUser {
    nameEmail?: string;
    name?: string;
    email?: string;
    password?: string;
    forgot_password_token?:string
}

// --------------------------------------------------------------------------------------------------------------
// locality
// --------------------------------------------------------------------------------------------------------------
export interface ILocality {
    id?: number
    district?: IDistrict
    name?: string
    latitude?: string
    longitude?: string
    population?: IPopulation
}

export interface IDistrict {
    id?: number
    name?: string
}

export interface IPopulation {
    id?: number
    locality?: ILocality
    population_adult?: number
    population_child?: number
    year?: number
}

// --------------------------------------------------------------------------------------------------------------
// medical centers
// --------------------------------------------------------------------------------------------------------------

export interface IPointsMedicalCenter {
    id?: number,
    adult_population?: number,
    child_population?: number,
    foundation_year?: number,
    staffing?: number,
    state?: number,
    each_pers_staffing?: number,
    max_found_year?: number
}

export interface IBuildingCondition {
    id?: number
    state?: string
    deteroation?: number
}


export interface IMedicalCenter {
    id?: number
    locality?: ILocality
    name?: string
    street?: string
    number_of_house?: string
    latitude?: number
    longitude?: number
    pharmacy?: number
    founding_year?: number
    staffing?: number
    phone?: string

    building_condition?: IBuildingCondition
}
