"use strict";
require('dotenv').config();
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require("sequelize");
const food = require('./food');
const Clothes = require('./clothes');

let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                // ssl:true ,
                ssl: { require: true, rejectUnauthorized: false} ,
                native: true
            },
        } : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

module.exports = {
    db: sequelize,
    Food: food(sequelize, DataTypes),
    Clothes: Clothes(sequelize, DataTypes)
};