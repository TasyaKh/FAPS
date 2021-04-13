const mysql = require('mysql')
const {Router} = require('express')
const config = require('config')
const router = Router()
const dataFile = require('../parser/result/data.json');

const configDB = {
  host: config.get('host'),
  user: config.get('user'),
  password: config.get('password'),
  port: config.get('portDB'),
  database: config.get('database')
}

const initializeConnection = (config) => {

  const addDisconnectHandler = (connection) => {
    connection.on("error", function (error) {
      if (error instanceof Error) {
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
          console.error(error.stack)
          console.log("Lost connection. Reconnecting...")

          initializeConnection(connection.config);
        } else if (error.fatal) {
          throw error
        }
      }
    })
  }

  const connection = mysql.createConnection(config)

  addDisconnectHandler(connection)

  connection.connect()
  return connection
}

// /api/map/reports
router.post(
  '/',
  [],
  async (req, res) => {
    try {

      console.log(req.body)

      /*const connection = initializeConnection(configDB)

      connection.query('SELECT * FROM units', (err, rows, fields) => {
        if (err) {
          throw err
        }

        //res.json({data: rows})

      })*/
      //Подмена для dev-mode

      try {


      } catch (er) {
        console.log(er)
      }

      setTimeout(() => {
        res.json({
          'answ': req.body
        })
      }, 5000)

    } catch (e) {
      console.log(e)
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  }
)

module.exports = router