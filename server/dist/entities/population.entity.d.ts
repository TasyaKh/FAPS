import Locality from "./locality.entity";
export declare class Population {
    id: number;
    locality_id: number;
    population_adult: number;
    population_child: number;
    year: number;
    locality: Locality;
}
