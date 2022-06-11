import express, { Application } from 'express'
import path from 'path'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import sequelize from './utils/db'
const models = require('./models/models')
require('./passport')
import errorHandler from './middleware/ErrorHandlingMiddleware'
import cookieParser from 'cookie-parser'
import router from './routes'
import cookieSession from 'cookie-session'
import passport from 'passport'

require('dotenv').config({ path: __dirname+'./../.env' })

const app:Application = express()
const PORT = process.env.PORT || 5000

app.set('view engine', 'pug')
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(cookieParser())
app.use(
  cookieSession({
    name: 'accessToken',
    keys: ['keyOne'],
    maxAge: 24 * 60 * 60 * 100
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
  credentials: true,
  methods:'GET,POST,PUT,DELETE',
  origin:`${process.env.CLIENT_URL}`
}))
app.use(fileUpload({}))
app.use('/api', router)

app.set('views', './src/views')
app.get('*', function (req, res) {
  res.render('index', { title: 'Hey', js: '/assets/bundle.js', css: '/assets/bundle.css' })
})


// Обработка ошибок, последний Middleware
// app.use(errorHandler.errorHandling)

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
