import connection from "../../db.js";

export async function getOrganizationsByDistrictId(districtId:number){
    let r: any

    const query = `SELECT * FROM medical_facility WHERE district_id = ?`


    r = await new Promise((resolve, reject) => {
        connection.query(query, [districtId], (err: any, result: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })


    return r
}