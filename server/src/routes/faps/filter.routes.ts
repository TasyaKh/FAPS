import {Router} from 'express'
import {initializeConnection} from '../../functions/initializeConnection.js'
import {normalizeData} from "../../functions/normalizeData.js"
import {configDB} from "./configDB";

const router = Router()

  export default (app: Router) => {
    app.use('/filter', router)
    // /api/filter
    router.post(
        '/',
        [],
        async (req, res) => {
          try {

            const limiters = []
            let having = ''

            for (const param of Object.keys(req.body)) {

              if (param === 'foundationYearFrom' && req.body.foundationYearFrom !== null) {

                limiters.push('`founding_year` > ' + req.body.foundationYearFrom)

              } else if (param === 'foundationYearTo' && req.body.foundationYearTo !== null) {

                limiters.push('`founding_year` < ' + req.body.foundationYearTo)

              } else if (param === 'pharmacy' && req.body.pharmacy === true) {

                limiters.push('`pharmacy` = 1')

              } else if (param === 'firstAid' && req.body.firstAid === true) {

                limiters.push('`access_to_primary_health_care` = 1')

              } else if (param === 'emergencyAssistance' && req.body.emergencyAssistance === true) {

                limiters.push('`availability_of_emergency_mediical_care` = 1')

              } else if (param === 'district_id' && req.body.district_id !== null) {

                limiters.push('`district_id` = ' + req.body.district_id)

              } else if (param === 'staffing' && req.body.staffing !== null) {

                switch (req.body.staffing) {
                  case 1:
                    limiters.push('`medical_center`.`staffing` = 1')
                    break
                  case 2:
                    limiters.push('`medical_center`.`staffing` >= 0.5')
                    break
                  case 3:
                    limiters.push('`medical_center`.`staffing` < 0.5')
                    break
                  case 4:
                    limiters.push('`medical_center`.`staffing` = 0')
                    break
                }

              } else if (param === 'type_id' && req.body.type_id !== null) {

                limiters.push('`type_id` = ' + req.body.type_id)

              } else if (param === 'population_id' && req.body.population_id !== null) {

                switch (req.body.population_id) {
                  case 1:
                    having = 'HAVING (`population`.`population_adult`) < 100'
                    break
                  case 2:
                    having = 'HAVING (`population`.`population_adult`) >= 100 AND (`population`.`population_adult`) <= 300'
                    break
                  case 3:
                    having = 'HAVING (`population`.`population_adult`) > 300 AND (`population`.`population_adult`) <= 1000'
                    break
                  case 4:
                    having = 'HAVING (`population`.`population_adult`) > 1000 AND (`population`.`population_adult`) <= 2000'
                    break
                  case 5:
                    having = 'HAVING (`population`.`population_adult`) > 2000'
                    break
                }

              }
            }

            const connection = initializeConnection(configDB)

            let query

            if (req.body.source === 'table') {
              query = 'SELECT `medical_center`.`name`, `founding_year`, `availability_of_emergency_mediical_care`, `access_to_primary_health_care`, `pharmacy`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`, `region`.`name` AS `region_name`, `street`, `number_of_house`, `medical_center`.`id`, `population`.`population_adult` AS `population` FROM `medical_center`\n' +
                  'LEFT JOIN `locality`\n' +
                  '        ON `medical_center`.`locality_id` = `locality`.`id`\n' +
                  'LEFT JOIN `district`\n' +
                  '        ON `locality`.`district_id` = `district`.`id`\n' +
                  'LEFT JOIN `region`\n' +
                  '        ON `region`.`id` = `district`.`region_id`\n' +
                  'LEFT JOIN `population`\n' +
                  '        ON `population`.`id` = (SELECT `p`.`id` FROM `population` AS `p` WHERE `p`.`locality_id` = `locality`.`id` ORDER BY `p`.`year` ASC LIMIT 1)'
            } else {
              query = 'SELECT `medical_center`.`id`, `medical_center`.`name`, `medical_center`.`street`, `medical_center`.`number_of_house`, `medical_center`.`latitude`, `medical_center`.`longitude`, `locality`.`name` AS `locality_name`, `district`.`name` AS `district_name`, `region`.`name` AS `region_name`, `population`.`population_adult`, `population`.`population_child`, `staffing`  FROM `medical_center`\n' +
                  'LEFT JOIN `locality`\n' +
                  '        ON `medical_center`.`locality_id` = `locality`.`id`\n' +
                  'LEFT JOIN `district`\n' +
                  '        ON `locality`.`district_id` = `district`.`id`\n' +
                  'LEFT JOIN `region`\n' +
                  '        ON `region`.`id` = `district`.`region_id`\n' +
                  'LEFT JOIN `types`\n' +
                  '        ON `medical_center`.`type_id` = `types`.`id`\n' +
                  'LEFT JOIN `population`\n' +
                  '        ON `population`.`id` = (SELECT `p`.`id` FROM `population` AS `p` WHERE `p`.`locality_id` = `locality`.`id` ORDER BY `p`.`year` ASC LIMIT 1)'
            }

            if (limiters.length !== 0) {
              query += '\n WHERE '

              for (let i = 0; i < limiters.length; i++) {
                if (i === limiters.length - 1) {
                  query += limiters[i]
                } else {
                  query += limiters[i] + ' AND '
                }
              }
            }

            if (having.length > 0) {
              query += '\n' + having
              query += '\n' + 'ORDER BY `medical_center`.`name` ASC'
            }

            connection.query(query, (err, rows) => {
              connection.end()

              if (err) {
                throw err
              }

              if (req.body.source === 'table') {
                normalizeData(rows, true)
              }

              res.json({data: rows})
            })

          } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
          }
        }
    )
}

