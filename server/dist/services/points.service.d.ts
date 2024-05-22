import { ConditionsLocalityDto } from "../dto/conditions_locality.dto";
import { ConditionsLocality } from "../entities/conditions_locality.entity";
import { User } from "../entities/user.entity";
import { CustomSolutionsLocalities, LocalitiesAndNearMcsDto } from "../dto/distance.dto";
import { PointsMedicalCenter } from "../entities/points_medical_center.entity";
import { PointsMedicalCenterDto, SolutionsMCS } from "../dto/points_medical_center.dto";
import express from "express";
import { SolutionsMCSDto } from "../dto/solutions_mcs.dto";
export declare class PointsService {
    createOrUpdateConditionsLocality(user: User, conditionsLocalityDto: ConditionsLocalityDto): Promise<void>;
    createConditionsLocality(user: User, conditionsLocalityDto: ConditionsLocalityDto): Promise<import("typeorm").InsertResult>;
    updateConditionsLocality(id: number, conditionsLocalityDto: ConditionsLocalityDto): Promise<import("typeorm").UpdateResult>;
    getConditionsLocality(userId: number): Promise<ConditionsLocality>;
    getSolutionsLocalities(userId: number, body: LocalitiesAndNearMcsDto): Promise<CustomSolutionsLocalities[]>;
    getPointsMCS(userId: number): Promise<PointsMedicalCenter>;
    createPointsMCS(user: User, pMC: PointsMedicalCenterDto): Promise<import("typeorm").InsertResult>;
    updatePointsMCS(id: number, pMC: PointsMedicalCenterDto): Promise<import("typeorm").UpdateResult>;
    createOrUpdatePointsMCS(user: User, pMC: PointsMedicalCenterDto): Promise<void>;
    getSolutionsMCS(userId: number, dto: SolutionsMCSDto, res: express.Response): Promise<SolutionsMCS[]>;
    sortSolutionsMCSByASCDesc(points: SolutionsMCS[], field?: string, direction?: 'ASC' | 'DESC'): SolutionsMCS[];
}
