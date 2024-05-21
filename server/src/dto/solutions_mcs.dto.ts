import {MedicalCenterDto} from "./points_medical_center.dto";

export class SolutionsMCSDto extends MedicalCenterDto{
    mc_population_adult_order?:'ASC' | 'DESC'
    mc_population_child_order?:'ASC' | 'DESC'
    foundation_year_order?:'ASC' | 'DESC'
    mc_staffing_order?:'ASC' | 'DESC'
    sum_order?:'ASC' | 'DESC'
}
