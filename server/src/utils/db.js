"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const dbName = `${process.env.DB_NAME}`;
const dbUser = `${process.env.DB_USER}`;
const dbHost = `${process.env.DB_HOST}`;
const dbPassword = `${process.env.DB_PASS}`;
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql'
});
exports.default = sequelize;
