import {Router} from 'express'
import AppDataSource from "../../typeorm.config";

const router = Router()

export default (app: Router) => {
    app.use('/edit', router)
    const updateRatesInDataBase = async (id) => {
        let query = 'SELECT `medical_center`.`id`, `staff`.`rate_full`, `staff`.`rate_occupied` FROM `medical_center`\n' +
            'LEFT JOIN `staff`\n' +
            ' ON `medical_center`.`id` = `staff`.`medical_center_id`\n' +
            'WHERE `medical_center`.`id` = 125'

        const entityManager = AppDataSource.createEntityManager()


        await entityManager.query(query).catch((err) => {
            throw err
        }).then( async (rows) => {
            // TODO: CHECK all in file
            let rateFullSum = 0
            let rateOccupiedSum = 0

            for (const row of rows) {
                rateFullSum += row.rate_full
                rateOccupiedSum += row.rate_occupied
            }

            const staffing = Math.floor(rateOccupiedSum / rateFullSum * 100) / 100

            query = 'UPDATE `medical_center` SET `staffing` = ' + staffing + ' WHERE `medical_center`.`id` = ' + id


            await entityManager.query(query).catch((err) => {
                throw err
            })

            return true
        })


    }

// /api/edit/rate/add
    router.post(
        '/rate/add',
        [],
        async (req, res) => {
            try {

                const entityManager = AppDataSource.createEntityManager()

                let date = new Date()
                // @ts-ignore
                date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + '-' + date.getDate()

                const query = "INSERT INTO `staff` (`id`, `medical_center_id`, `date`, `position`, `rate_full`, `rate_occupied`) VALUES (?, ?, ?, ?, ?, ?)"

                try {
                    const result = await entityManager.query(query,
                        [null, req.body.medical_center_id, date, req.body.position, parseFloat(req.body.rate_full), parseFloat(req.body.rate_occupied)])
                    res.json(result)
                } catch (err) {
                    await updateRatesInDataBase(req.body.medical_center_id)
                    res.json({
                        success: true
                    })
                }
            } catch (e) {
                console.log(e)
                res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
            }
        }
    )

// /api/edit/rate/update
    router.post(
        '/rate/update',
        [],
        async (req, res) => {
            try {
                const entityManager = AppDataSource.createEntityManager()

                let date = new Date()
                // @ts-ignore
                date = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + '-' + date.getDate()

                const query:string = "UPDATE `staff` SET `date` = ?, `position` = ?, `rate_full` = ?, `rate_occupied` = ? WHERE `staff`.`id` = ?"

                await entityManager.query(query, [date, req.body.position, req.body.rate_full, req.body.rate_occupied, req.body.id])

                await updateRatesInDataBase(req.body.medical_center_id)

                res.json({
                    success: true
                })
            } catch (e) {
                console.log(e)
                res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
            }
        }
    )

// /api/edit/rate/delete
    router.post(
        '/rate/delete',
        [],
        async (req, res) => {
            try {
                const entityManager = AppDataSource.createEntityManager()

                const query = "DELETE FROM `staff` WHERE `staff`.`id` = ?"

                await entityManager.query(query, [req.body.id])
                await updateRatesInDataBase(req.body.medical_center_id)

            } catch (e) {
                console.log(e)
                res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
            }
        }
    )
}