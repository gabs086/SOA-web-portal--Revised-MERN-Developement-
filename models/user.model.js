const Sequelize = require('sequelize');
const db = require('../config/db');


model.exports = db.sequelize.define(
    'users',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING,
        },
        campus: {
            type: Sequelize.STRING,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },  {
        timestamps: false
    }

)