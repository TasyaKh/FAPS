import {Router} from 'express'
import {normalizeData} from "../../functions/normalizeData.js"
import mappings from "../../mappings.js"
import AppDataSource from "../../typeorm.config";

const router = Router()

export default (app: Router) => {
    app.use('/views', router)
// /api/view/
    router.post(
        '/',
        [],
        async (req, res) => {
            try {
                const entityManager = AppDataSource.createEntityManager()

                const query = 'SELECT `medical_center`.`name`, `founding_year`, `availability_of_emergency_mediical_care`, `access_to_primary_health_care`, `pharmacy`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`, `region`.`name` AS `region_name`, `street`, `number_of_house`, `medical_center`.`id`, `population`.`population_adult` AS `population` FROM `medical_center`\n' +
                    'LEFT JOIN `locality`\n' +
                    '        ON `medical_center`.`locality_id` = `locality`.`id`\n' +
                    'LEFT JOIN `district`\n' +
                    '        ON `locality`.`district_id` = `district`.`id`\n' +
                    'LEFT JOIN `region`\n' +
                    '        ON `region`.`id` = `district`.`region_id`\n' +
                    'LEFT JOIN `population`\n' +
                    '        ON `population`.`id` = (SELECT `p`.`id` FROM `population` AS `p` WHERE `p`.`locality_id` = `locality`.`id` ORDER BY `p`.`year` ASC LIMIT 1)' +
                    'ORDER BY `medical_center`.`name`'

                const result = await entityManager.query(query).then((rows) => {

                    if (rows.length === 0) {
                        res.json({
                            objects: [],
                            headers: []
                        })

                        return
                    }

                    normalizeData(rows, true)

                    const headers = []

                    for (const key of Object.keys(rows[0])) {
                        for (const mapping of mappings) {
                            if (key === mapping.queryName || key === mapping.fullQueryName) {
                                headers.push(mapping.columnName)
                            }
                        }
                    }

                    res.json({
                        data: rows,
                        headers
                    })
                })
                res.json(result)

            } catch (e) {
                console.log(e)
                res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
            }
        }
    )
}