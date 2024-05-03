import {Router} from 'express'
import AppDataSource from "../../typeorm.config";
import Locality from "../../entities/locality.entity";
import {checkUserRoleOrErr, verifyUserToken} from "../../services/auth.service";
import {Roles} from "../../roles";

const router = Router()
export default (app: Router) => {
    app.use('/location', router)
// /api/location/regions
    router.post(
        '/regions',
        [],
        async (req, res) => {
            try {

                const entityManager = AppDataSource.createEntityManager()

                const result = await entityManager.query('SELECT `region`.`id`, `region`.`name`, COUNT(`district`.`id`) AS `districts_count` FROM `region`\n' +
                    'LEFT JOIN `district` \n' +
                    '\tON `region`.`id` = `district`.`region_id` \n' +
                    'GROUP BY `region`.`id`\n' +
                    'ORDER BY `region`.`name`');

                res.json(result)

            } catch (e) {
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

                const entityManager = AppDataSource.createEntityManager()

                let query: string
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

                const result = await entityManager.query(query)

                res.json(result)

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

                const entityManager = AppDataSource.createEntityManager()

                let query: string

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

                const result = await entityManager.query(query)
                res.json(result)

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

                const entityManager = AppDataSource.getRepository(Locality)
                let query = entityManager.createQueryBuilder('locality')
                    .select(['locality.id', 'locality.district_id', 'locality.longitude', 'locality.latitude',
                        'locality.name', 'population.population_adult', 'population.population_child',
                        'district.name'])
                    .leftJoin('locality.population', 'population')
                    .leftJoin('locality.district', 'district')
                    .groupBy('locality.id')
                    .orderBy('locality.name', 'DESC')


                req.params.id ?
                    query.where('locality.id = :locality_id', {locality_id: req.params.id}) : query

                res.json(await query.getOne())
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
        verifyUserToken,
        async (req, res) => {
            try {
                checkUserRoleOrErr(req, res, Roles.EXPERT)
                const entityManager = AppDataSource.createEntityManager()

                const query = "UPDATE `district` SET `region_id` = " + req.body.region_id + ", `name` = '" + req.body.name + "' WHERE `district`.`id` = " + req.body.id

                const result = await entityManager.query(query)
                res.json({
                    success: true
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
        verifyUserToken,
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            try {
                const entityManager = AppDataSource.createEntityManager()

                const query = "UPDATE `locality` SET `district_id` = '" + req.body.district_id + "', `name` = '" + req.body.name + "' WHERE `locality`.`id` = " + req.body.id

                const result = await entityManager.query(query)
                res.json({
                    success: true
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
        verifyUserToken,
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            try {
                const entityManager = AppDataSource.createEntityManager()

                const query = "UPDATE `region` SET `name` = '" + req.body.name + "' WHERE `region`.`id` = " + req.body.id

                const result = await entityManager.query(query)
                res.json({
                    success: true
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
        verifyUserToken,
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            try {

                const entityManager = AppDataSource.createEntityManager()

                const query = "INSERT INTO `district` (`id`, `region_id`, `name`) VALUES (NULL, " + req.body.region_id + ", '" + req.body.name + "')"

                const result = await entityManager.query(query)
                res.json({
                    success: true
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
        verifyUserToken,
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            try {

                const entityManager = AppDataSource.createEntityManager()

                const query = "INSERT INTO `locality` (`id`, `district_id`, `name`) VALUES (NULL, " + req.body.district_id + ", '" + req.body.name + "')"

                const result = await entityManager.query(query)
                res.json({
                    success: true
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
        verifyUserToken,
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            try {

                const entityManager = AppDataSource.createEntityManager()

                const query = "INSERT INTO `region` (`id`, `name`) VALUES (NULL, '" + req.body.name + "')"

                const result = await entityManager.query(query)
                res.json({
                    success: true
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
        verifyUserToken,
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            try {

                const entityManager = AppDataSource.createEntityManager()

                const query = "DELETE FROM `district` WHERE `district`.`id` = " + req.body.id

                const result = await entityManager.query(query)
                res.json({
                    success: true
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
        verifyUserToken,
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            try {

                const entityManager = AppDataSource.createEntityManager()

                const query = "DELETE FROM `locality` WHERE `locality`.`id` = " + req.body.id

                const result = await entityManager.query(query)
                res.json({
                    success: true
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
        verifyUserToken,
        async (req, res) => {
            checkUserRoleOrErr(req, res, Roles.EXPERT)
            try {

                const entityManager = AppDataSource.createEntityManager()

                const query = "DELETE FROM `region` WHERE `region`.`id` = " + req.body.id

                const result = await entityManager.query(query)
                res.json({
                    success: true
                })
            } catch (e) {
                console.log(e)
                res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
            }
        }
    )
}
