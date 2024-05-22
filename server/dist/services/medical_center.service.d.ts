import express from "express";
import MedicalCenter from "../entities/medical_center.entity";
import { MedicalCenterDto } from "../dto/points_medical_center.dto";
export declare function getMedicalCenters(mc: MedicalCenterDto, res: express.Response): Promise<MedicalCenter[]>;
