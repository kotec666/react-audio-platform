import express, { Application } from 'express'
import path from 'path'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import sequelize from './utils/db'
// const models = require('./models/models')
// import router from './routes'
import errorHandler from './middleware/ErrorHandlingMiddleware'

require('dotenv').config({ path: __dirname+'/.env' })

const app:Application = express()
const PORT = process.env.PORT || 3000


app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
// app.use('/api', router)


// Обработка ошибок, последний Middleware
app.use(errorHandler.errorHandling)

async function start() {
  try {
    await sequelize.sync()
    app.listen(PORT)
    console.log('day a')
  } catch (e) {
    console.log(e)
  }
}

start()
