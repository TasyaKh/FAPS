import {Router} from 'express'
import {initializeConnection} from '../../functions/initializeConnection.js'
import {configDB} from "./configDB";

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

          const connection = initializeConnection(configDB)

          const query = 'SELECT `name` FROM `images` WHERE\n' +
              '\t`photo_id` = ' + id

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
}