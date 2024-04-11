import MC from "../../entities/medical_center.entity";
import express from "express";
import AppDataSource from "../../typeorm.config";
import MedicalCenter from "../../entities/medical_center.entity";
import {MedicalCenterDto} from "../../dto/points_medical_center.dto";

export async function getMedicalCenters(mc: MedicalCenterDto, res: express.Response) {
    let r

    try {

        const mcRepo = AppDataSource.getRepository(MedicalCenter)
        const query = mcRepo.createQueryBuilder('medical_center')
            .leftJoinAndSelect('medical_center.locality', 'locality')
            .leftJoinAndSelect('locality.population', 'population')
            .leftJoinAndSelect('locality.district', 'district')
            .leftJoinAndSelect('medical_center.building_condition', 'building_condition')
            .where('district.id = :district_id', {district_id: mc.district_id})


        if (mc.district_id) {
            query.andWhere('district.id = :district_id', {district_id: mc.district_id})
        }

        if (mc.region_id) {
            query.leftJoinAndSelect('district.region', 'region')
                .andWhere('region.id = :region_id', {region_id: mc.region_id})
        }

        r = await query.getMany()

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }

    return r
}


