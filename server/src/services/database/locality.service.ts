import AppDataSource from "../../typeorm.config";

export async function getLocalitiesByDistrictId(districtId: number) {
    let r: any

    const entityManager = AppDataSource.createEntityManager()


    const query = 'SELECT `locality`.`id`, `locality`.`district_id`, `locality`.`name`, `locality`.`longitude`, `locality`.`latitude`,   (`population`.`population_adult`) AS `population` FROM `locality`\n' +
        'LEFT JOIN `population`\n' +
        ' ON `locality`.`id` = `population`.`locality_id`\n' +
        'WHERE `locality`.`district_id` = ? \n'
        // + 'GROUP BY `locality`.`id`\n' +
        // 'ORDER BY `locality`.`name`'

    try {
        r = await entityManager.query(query, [districtId])
    } catch (err) {
        return false
    }

    return r
}