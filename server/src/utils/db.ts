import { Sequelize } from 'sequelize'

const dbName = 'audio_platform'
const dbUser = 'root'
const dbHost = 'localhost'
const dbPassword = 'root'

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql'
})

export default sequelize
