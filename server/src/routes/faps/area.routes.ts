import {Router} from 'express'
import {initializeConnection} from '../../functions/initializeConnection.js'
import {configDB} from "./configDB";

const router = Router()
export default (app: Router) => {
    app.use('/reports/area', router)

// /api/reports/area
        router.post(
            '/',
            [],
            async (req, res) => {
                try {

                    const connection = initializeConnection(configDB)

                    const query = 'SELECT `id`, `region_id`, `name` AS `district_name` FROM `district`'

                    connection.query(query, (err, rows, fields) => {
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
}