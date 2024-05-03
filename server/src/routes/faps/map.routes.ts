import {Router} from 'express'
import AppDataSource from "../../typeorm.config";

const router = Router()

export default (app: Router) => {
    app.use('/map', router)

// /api/map/
    router.post(
        '/',
        [],
        async (req, res) => {
            try {
                const entityManager = AppDataSource.createEntityManager()
                const query = 'SELECT `medical_center`.`id`, `medical_center`.`name`, `medical_center`.`street`, `medical_center`.`number_of_house`, `medical_center`.`latitude`, `medical_center`.`longitude`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`,  `district`.`id` AS `district_id`, `region`.`name` AS `region_name`,  `medical_center`.`staffing` FROM `medical_center`\n' +
                    '    LEFT JOIN `locality`\n' +
                    '        ON `medical_center`.`locality_id` = `locality`.`id`\n' +
                    '    LEFT JOIN `district`\n' +
                    '        ON `locality`.`district_id` = `district`.`id`\n' +
                    '    LEFT JOIN `region`\n' +
                    '        ON `region`.`id` = `district`.`region_id`' +
                    '    ORDER BY `medical_center`.`name`'

                const result = await entityManager.query(query)
                res.json({data:result})

            } catch (e) {
                console.log(e)
                res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
            }
        }
    )

// /api/map/organizations
    router.post(
        '/organizations',
        [],
        async (req, res) => {
            try {
                const entityManager = AppDataSource.createEntityManager()
                const query = 'SELECT `medical_facility`.`id`, `medical_facility`.`name`, `type_id`,  `medical_facility`.`latitude`, `medical_facility`.`longitude`, `locality_id`, `street`, `number_of_house`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`, `region`.`name` AS `region_name` FROM `medical_facility`\n' +
                    'LEFT JOIN `locality`\n' +
                    '    ON `medical_facility`.`locality_id` = `locality`.`id`\n' +
                    'LEFT JOIN `district`\n' +
                    '    ON `locality`.`district_id` = `district`.`id`\n' +
                    'LEFT JOIN `region`\n' +
                    '    ON `region`.`id` = `district`.`region_id`'

                const result = await entityManager.query(query)
                res.json({data:result})
            } catch (e) {
                console.log(e)
                res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
            }
        }
    )
}

