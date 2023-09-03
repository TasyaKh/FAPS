import {Router} from 'express'
import config from 'config'
import {initializeConnection} from '../../functions/initializeConnection.js'

const router = Router()

const configDB = {
    host: config.get('host'),
    user: config.get('user'),
    password: config.get('password'),
    port: config.get('portDB'),
    database: config.get('database'),
    charset: 'utf8'
}

// /api/location/regions
router.post(
    '/regions',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            const query = 'SELECT `region`.`id`, `region`.`name`, COUNT(`district`.`id`) AS `districts_count` FROM `region`\n' +
                'LEFT JOIN `district` \n' +
                '\tON `region`.`id` = `district`.`region_id` \n' +
                'GROUP BY `region`.`id`\n' +
                'ORDER BY `region`.`name`'

            connection.query(query, (err, rows) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json(rows)
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

// /api/location/districts
router.post(
    '/districts',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            let query

            if (req.body.id) {
                query = 'SELECT `district`.`id`, `district`.`name`, `locality`.`longitude`, `locality`.`latitude`, `district`.`region_id`, COUNT(`locality`.`id`) AS `localities_count` FROM `district`\n' +
                    'LEFT JOIN `locality`\n' +
                    '\tON `district`.`id` = `locality`.`district_id`\n' +
                    'WHERE `district`.`region_id` = ' + req.body.id + '\n' +
                    'GROUP BY `district`.`id`\n' +
                    'ORDER BY `district`.`name`'
            } else {
                query = 'SELECT `district`.`id`, `district`.`name`, `locality`.`longitude`, `locality`.`latitude`, `district`.`region_id`, COUNT(`locality`.`id`) AS `localities_count` FROM `district`\n' +
                    'LEFT JOIN `locality`\n' +
                    '\tON `district`.`id` = `locality`.`district_id`\n' +
                    'GROUP BY `district`.`id`\n' +
                    'ORDER BY `district`.`name`'
            }

            connection.query(query, (err, rows) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json(rows)
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

// /api/location/localities
router.post(
    '/localities',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            let query

            if (req.body.id) {
                query = 'SELECT `locality`.`id`, `locality`.`district_id`, `locality`.`longitude`, `locality`.`latitude`, `locality`.`name`, (`population`.`population_adult`) AS `population` FROM `locality`\n' +
                    'LEFT JOIN `population`\n' +
                    ' ON `locality`.`id` = `population`.`locality_id`\n' +
                    'WHERE `locality`.`district_id` = ' + req.body.id + '\n' +
                    'GROUP BY `locality`.`id`\n' +
                    'ORDER BY `locality`.`name`'
            } else {
                query = 'SELECT `locality`.`id`, `locality`.`district_id`, `locality`.`longitude`, `locality`.`latitude`, `locality`.`name`, (`population`.`population_adult`) AS `population` FROM `locality`\n' +
                    'LEFT JOIN `population`\n' +
                    ' ON `locality`.`id` = `population`.`locality_id`\n' +
                    'GROUP BY `locality`.`name`\n' +
                    'ORDER BY `locality`.`name`'
            }

            connection.query(query, (err, rows) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json(rows)
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

// /api/location/locality/:id
router.post(
    '/locality/:id',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            let query = `
SELECT locality.id, locality.district_id, locality.longitude, locality.latitude, 
locality.name, (population.population_adult) AS population_adult, (population.population_child) AS population_child,
district.name as district_name
FROM locality
                LEFT JOIN population
                ON locality.id = population.locality_id
                LEFT JOIN district
                ON district.id = locality.district_id`

            if (req.params.id) {
                query += ` WHERE locality.id  = ?`
            }

            query += `  
            GROUP BY locality.id
            ORDER BY locality.name`


            connection.query(query, [req.params.id],  (err, rows) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json(rows[0])
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

// /api/location/localities-with-faps
router.post(
    '/localities-with-faps',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            let query
            let values = []

            query = `
SELECT 
    locality.id,
    locality.district_id,
    locality.longitude,
    locality.latitude,
    locality.name,
    (population.population_adult) AS population,
    COALESCE(dtmc.distance, 0) AS min_distance,
    dtmc.duration AS min_duration,
    mc.id AS mc_id,
    mc.longitude AS mc_longitude,
    mc.latitude AS mc_latitude,
    mc.name AS medical_center_name,
    mc.staffing AS mc_staffing,
    mcf.id AS mcf_id,
    mcf.longitude AS mcf_longitude,
    mcf.latitude AS mcf_latitude,
    mcf.name AS mcf_name,
    dtmcf.distance AS min_facility_distance,
    dtmcf.duration AS min_facility_duration
FROM
    locality
        LEFT JOIN
    population ON locality.id = population.locality_id
       
       
       
       LEFT JOIN
    (SELECT 
        locality_id, MIN(distance) AS min_distance
    FROM
        distance
    WHERE
        mc_id IS NOT NULL
            AND mc_facility_id IS NULL
    GROUP BY locality_id) md ON md.locality_id = locality.id
       
       LEFT JOIN
    distance dtmc ON dtmc.locality_id = locality.id
        AND dtmc.distance = md.min_distance
        
        LEFT JOIN
    medical_center AS mc ON mc.id = dtmc.mc_id
    
    
    
        LEFT JOIN
    (SELECT 
        locality_id, MIN(distance) AS min_distance
    FROM
        distance
    WHERE
        mc_facility_id IS NOT NULL
            AND mc_id IS NULL
    GROUP BY locality_id) mfd ON mfd.locality_id = locality.id
      
      LEFT JOIN
    distance dtmcf ON dtmcf.locality_id = locality.id
        AND dtmcf.distance = mfd.min_distance
        
        LEFT JOIN
    medical_facility AS mcf ON mcf.id = dtmcf.mc_facility_id
     WHERE 1 = 1`


            if (req.body.district_id) {
                query += ` and locality.district_id = ?`
                values.push(req.body.district_id)
            }

            query += ` GROUP BY locality.id
                ORDER BY population DESC`

            connection.query(query, values, (err, rows) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json(rows)
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

// --- Update block

// /api/location/update/district
router.post(
    '/update/district',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            const query = "UPDATE `district` SET `region_id` = " + req.body.region_id + ", `name` = '" + req.body.name + "' WHERE `district`.`id` = " + req.body.id

            connection.query(query, (err) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json({
                    success: true
                })
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

// /api/location/update/locality
router.post(
    '/update/locality',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            const query = "UPDATE `locality` SET `district_id` = '" + req.body.district_id + "', `name` = '" + req.body.name + "' WHERE `locality`.`id` = " + req.body.id


            connection.query(query, (err) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json({
                    success: true
                })
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

// /api/location/update/region
router.post(
    '/update/region',
    [],
    async (req, res) => {
        try {
            const connection = initializeConnection(configDB)

            const query = "UPDATE `region` SET `name` = '" + req.body.name + "' WHERE `region`.`id` = " + req.body.id

            connection.query(query, (err) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json({
                    success: true
                })
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

// --- Add block

// /api/location/add/district
router.post(
    '/add/district',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            const query = "INSERT INTO `district` (`id`, `region_id`, `name`) VALUES (NULL, " + req.body.region_id + ", '" + req.body.name + "')"

            connection.query(query, (err) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json({
                    success: true
                })
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

// /api/location/add/locality
router.post(
    '/add/locality',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            const query = "INSERT INTO `locality` (`id`, `district_id`, `name`) VALUES (NULL, " + req.body.district_id + ", '" + req.body.name + "')"

            connection.query(query, (err) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json({
                    success: true
                })
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

// /api/location/add/region
router.post(
    '/add/region',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            const query = "INSERT INTO `region` (`id`, `name`) VALUES (NULL, '" + req.body.name + "')"

            connection.query(query, (err) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json({
                    success: true
                })
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)


// --- Remove block

// /api/location/delete/district
router.post(
    '/delete/district',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            const query = "DELETE FROM `district` WHERE `district`.`id` = " + req.body.id

            connection.query(query, (err) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json({
                    success: true
                })
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

// /api/location/delete/locality
router.post(
    '/delete/locality',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            const query = "DELETE FROM `locality` WHERE `locality`.`id` = " + req.body.id

            connection.query(query, (err) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json({
                    success: true
                })
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

// /api/location/delete/region
router.post(
    '/delete/region',
    [],
    async (req, res) => {
        try {

            const connection = initializeConnection(configDB)

            const query = "DELETE FROM `region` WHERE `region`.`id` = " + req.body.id

            connection.query(query, (err) => {
                connection.end()

                if (err) {
                    throw err
                }

                res.json({
                    success: true
                })
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

export default router

/*

SELECT `region`.`id`, `region`.`name`, COUNT(`district`.`id`) AS `districts_count` FROM `region`
LEFT JOIN `district`
	ON `region`.`id` = `district`.`region_id`
GROUP BY `region`.`id`
ORDER BY `region`.`name`

SELECT `district`.`id`, `district`.`name`, COUNT(`locality`.`id`) AS `localities_count` FROM `district`
LEFT JOIN `locality`
	ON `district`.`id` = `locality`.`district_id`
GROUP BY `district`.`id`
ORDER BY `district`.`name`

SELECT `district`.`id`, `district`.`name`, COUNT(`locality`.`id`) AS `localities_count` FROM `district`
LEFT JOIN `locality`
	ON `district`.`id` = `locality`.`district_id`
WHERE `district`.`region_id` = 1
GROUP BY `district`.`id`
ORDER BY `district`.`name`

// Запрос на 1 район
SELECT `district`.`id`, `district`.`name`, COUNT(`locality`.`id`) AS `localities_count`, `region`.`name` AS `region_name` FROM `district`
LEFT JOIN `locality`
	ON `district`.`id` = `locality`.`district_id`
JOIN `region`
	ON `district`.`region_id` = `region`.`id`
WHERE `district`.`id` = 1
GROUP BY `district`.`id`
ORDER BY `district`.`name`

SELECT `locality`.`id`, `locality`.`district_id`, `locality`.`name`, (`population`.`population_adult`) AS `population` FROM `locality`
LEFT JOIN `population`
	ON `locality`.`id` = `population`.`locality_id`
GROUP BY `locality`.`id`
ORDER BY `locality`.`name`

SELECT `locality`.`id`, `locality`.`district_id`, `locality`.`name`, (`population`.`population_adult`) AS `population` FROM `locality`
LEFT JOIN `population`
	ON `locality`.`id` = `population`.`locality_id`
WHERE `locality`.`district_id` = 1
GROUP BY `locality`.`id`
ORDER BY `locality`.`name`

 */