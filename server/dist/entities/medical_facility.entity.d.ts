import Locality from "./locality.entity";
import { Type } from "./types.entity";
import District from "./district.entity";
export declare class MedicalFacility {
    id: number;
    binding_key: number;
    name: string;
    latitude: number;
    longitude: number;
    street: string;
    number_of_house: string;
    phone: string;
    organization: string;
    ogrn: string;
    kpp: string;
    district: District;
    locality: Locality;
    type: Type;
}
