import express, { Application } from 'express'
import path from 'path'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import sequelize from './utils/db'
const models = require('./models/models')
import errorHandler from './middleware/ErrorHandlingMiddleware'
import cookieParser from 'cookie-parser'
import router from './routes'

require('dotenv').config({ path: __dirname+'/.env' })

const app:Application = express()
const PORT = process.env.PORT || 5000


app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({}))
app.use('/api', router)


// Обработка ошибок, последний Middleware
app.use(errorHandler.errorHandling)

async function start() {
  try {
    await sequelize.sync()
    app.listen(PORT)
    console.log(PORT)
  } catch (e) {
    console.log(e)
  }
}

start()
