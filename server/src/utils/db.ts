import { Sequelize } from 'sequelize'
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const dbName = `${process.env.DB_NAME}`
const dbUser = `${process.env.DB_USER}`
const dbHost = `${process.env.DB_HOST}`
const dbPassword = `${process.env.DB_PASS}`



const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
})

export default sequelize
