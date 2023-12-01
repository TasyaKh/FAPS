import {Router} from 'express'
import AppDataSource from "../../typeorm.config";

const router = Router()
export default (app: Router) => {
  app.use('/photo', router)
// /api/map/single/images
  router.post(
      '/',
      [],
      async (req, res) => {
        try {

          const id = req.body.id

            const entityManager = AppDataSource.createEntityManager()

          const query = 'SELECT `name` FROM `images` WHERE\n' +
              '\t`photo_id` = ' + id

            const result = await entityManager.query(query)
            res.json(result)

        } catch (e) {
          console.log(e)
          res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
      }
  )
}