// This will be my model in adding another campus of the university 

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
    'campuses',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        campusname:{
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
}, {
    timestamps: false
})