import Distance from "../../enities/distance.entity.js";
import connection from "../../db.js";

export class DistanceService {

    async save(distance: Distance) {
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
    async getDistToMc(distance: Distance) {
        let res: any
        let values: any[] = []

        let query: string = `
SELECT 
    distance.distance AS distance,
    distance.duration AS duration,
    mc.id AS mc_id,
    mc.name AS mc_name,
    mc.staffing AS mc_staffing,
    mc.longitude AS mc_longitude,
    mc.latitude AS mc_latitude
FROM
    distance
        LEFT JOIN
    medical_center AS mc ON mc.id = distance.mc_id
WHERE distance.mc_id IS NOT NULL`

        if (distance.locality_id) {
            query += ` AND distance.locality_id = ?`
            values.push(distance.locality_id)
        }

        query += ` ORDER BY distance.distance ASC
LIMIT ?`
        values.push(distance.limit)

        // get distances
        res = await new Promise((resolve, reject) => {
            connection.query(query, values, (err: any, result: any) => {

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

    // Удалить существующие записи
    async delExistig(distance: Distance) {
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

    // получить данные о расстоянии определенноого для нп
    // async getDistances(distance: Distance) {
    //     let res: any
    //
    //     // localities saved as end coords and start coords is some medical centers
    //     const query: string = `SELECT * FROM distance
    //     WHERE locality_id = ?
    //     ORDER BY distance ASC`
    //
    //     res = await new Promise((resolve, reject) => {
    //         connection.query(query, [
    //             distance.locality_id], (err: any, result: any) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(result);
    //             }
    //         });
    //     })
    //     return res
    // }


}