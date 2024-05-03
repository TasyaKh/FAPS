import {Router} from 'express'
import AppDataSource from "../../typeorm.config";

const router = Router()
export default (app: Router) => {
    app.use('/reports/area', router)

// /api/reports/area
        router.post(
            '/',
            [],
            async (req, res) => {
                try {

                    const entityManager = AppDataSource.createEntityManager()

                    const query = 'SELECT `id`, `region_id`, `name` AS `district_name` FROM `district`'

                    const result = await entityManager.query(query)
                    res.json(result)
                } catch (e) {
                    console.log(e)
                    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
                }
            }
        )
}