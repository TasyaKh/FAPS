export interface ILocalitiDistToNearectMC{
    locality_id?: number,
    locality_district_id?: number,
    locality_name?: string,
    locality_latitude?: number,
    locality_longitude?: number,
    population_id?: number,
    population_population_adult?: number,
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
}

export interface ICustomSolutionsLocalities{
    data?:ILocalitiDistToNearectMC,
    solutions?:string[]
}