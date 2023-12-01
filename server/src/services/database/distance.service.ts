import DistanceC from "../../classes/distanceC";
import AppDataSource from "../../typeorm.config";
import connection from "../../db";
import Distance from "../../entities/distance.entity";
import express from "express";

export class DistanceService {

    async save(distance: DistanceC) {

        let res: any

        await this.delExistig(distance)

        const query: string = `INSERT INTO distance (
        distance, duration, locality_id, mc_id, mc_facility_id) 
        VALUES (?, ?, ?, ?, ?)`

        // insert distances
        res = await new Promise((resolve, reject) => {
            connection.query(query, distance.getArray(), (err: any, result: any) => {

                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
        return res
    }

    // получить расстояния до мед учреждений по заданым параметрам
    async getDistToMc(res: express.Response, distance: DistanceC) {

        const distRepository = AppDataSource.getRepository(Distance);
        let distances: Distance[]
        try {
            let query = distRepository.createQueryBuilder('distance')
                .select(['distance.id', 'mc.id', 'mc.name', 'mc.staffing',
                    'mc.longitude', 'mc.latitude'])
                .leftJoin('distance.medical_center', 'mc')
                .where('distance.mc_id IS NOT NULL')
                .limit(distance.limit)
                .orderBy(' distance.distance', 'ASC')

            distance.locality_id ? query.andWhere('distance.locality_id = :locality_id',
                {locality_id: distance.locality_id}) : query

            distances = await query.getMany()
        } catch (err) {
            res.status(500).json({error: err})
        }

        return distances
    }

// Удалить существующие записи
    async delExistig(distance: DistanceC) {
        let res: any

        // del Existig Localities
        const query: string = `DELETE FROM distance
        WHERE locality_id = ? and ((mc_id = ? and mc_id is not null)
         or (mc_facility_id = ? and mc_facility_id is not null))`

        res = await new Promise((resolve, reject) => {
            connection.query(query, [
                distance.locality_id, distance.mc_id, distance.mc_facility_id], (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
        return res
    }
}