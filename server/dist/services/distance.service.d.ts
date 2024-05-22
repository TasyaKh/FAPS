import { DistanceDto, LocalitiDistToNearectMC, LocalitiesAndNearMcsDto } from "../dto/distance.dto";
import Distance from "../entities/distance.entity";
import express from "express";
export declare class DistanceService {
    saveDistance(distance: DistanceDto): Promise<any>;
    getDistToMc(res: express.Response, distance: DistanceDto): Promise<Distance[]>;
    delDistanceIfExists(distance: DistanceDto): Promise<any>;
    getLocalitiesAndNearMcs(locsAndNearMcsDto: LocalitiesAndNearMcsDto): Promise<false | LocalitiDistToNearectMC[]>;
    private filterLocalitiesAndNearMcs;
}
