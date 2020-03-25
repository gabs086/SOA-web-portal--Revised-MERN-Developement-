// Model for the hidden API of adding department 

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
    'departments',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        department:{
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
}, {
    timestamps: false
});