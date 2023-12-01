import connection from "../../db";
import MC from "../../entities/medical_center.entity";
import express from "express";

export async function getMedicalCenters(mc: MC, res: express.Response) {
    let r

    try {

        let values: any[] = []

        let query = `SELECT medical_center.name, medical_center.latitude,
            medical_center.longitude, medical_center.id 
            FROM medical_center
            left join locality on locality_id = locality.id
            left join district on district_id = district.id
            where 1 = 1 `


        if (mc.district_id) {
            query += 'and `district`.`id` = ?'
            values.push(mc.district_id)
        }

        if (mc.region_id) {
            query += 'and `district`.`region_id` = ?'
            values.push(mc.region_id)
        }


        // console.log(query, values)
        r = await new Promise((resolve, reject) => {
            connection.query(query, values, (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })


    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }

    return r
}


