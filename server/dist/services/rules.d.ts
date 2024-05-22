import { Engine } from "json-rules-engine";
import { ConditionsLocalityDto } from "../dto/conditions_locality.dto";
export interface IMessages {
    key: string;
    name: string;
}
export declare class RuleEngine {
    minDistanceKm: number;
    minPopulationForFAP: number;
    minPopulationForAmbulance: number;
    staffCompositionForDoctor: number;
    FAP: string;
    Ambulance: string;
    Hospital: string;
    facts: {
        staffComposition: number;
        facilityType: string;
        distanceMc: number;
        populationMC: number;
        populationNP: number;
    };
    engine: Engine;
    err: any;
    setConditions(cLD: ConditionsLocalityDto): void;
    initializeRules(): void;
    runEngine(): Promise<IMessages[]>;
}
