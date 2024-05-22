import { LocalitiesAndNearMcsDto } from "../dto/distance.dto";
import express from "express";
import { MedicalCenterDto } from "../dto/points_medical_center.dto";
export declare class UploadsService {
    getExcelSolutionsLocalities(userId: number, res: express.Response, locsAndNearMcsDto: LocalitiesAndNearMcsDto): Promise<void>;
    getExcelSolutionsMCS(userId: number, res: express.Response, medicalCenterDto: MedicalCenterDto): Promise<void>;
}
