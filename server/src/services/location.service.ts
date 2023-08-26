import connection from "../db";

export async function getLocalitiesByDistrictId(districtId: number) {
    let r: any

    const query = 'SELECT `locality`.`id`, `locality`.`district_id`, `locality`.`name`, (`population`.`population_adult`) AS `population` FROM `locality`\n' +
        'LEFT JOIN `population`\n' +
        ' ON `locality`.`id` = `population`.`locality_id`\n' +
        'WHERE `locality`.`district_id` = ? '
    'GROUP BY `locality`.`id`\n' +
    'ORDER BY `locality`.`name`'


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