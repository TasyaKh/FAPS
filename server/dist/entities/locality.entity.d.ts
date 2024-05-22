import District from "./district.entity";
import { Population } from "./population.entity";
import Distance from "./distance.entity";
export default class Locality {
    id: number;
    district_id: number;
    name: string;
    latitude: number;
    longitude: number;
    district: District;
    population: Population;
    distances_mc: Distance[];
    distances_mf: Distance[];
}
