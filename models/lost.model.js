// This model is for the structure of lost and found 

// The structure for the model are 
// - id
// - studentname
// - sr-code
// - year(1st, 2nd, 3rd, 4th, etc.)
// - campus
// - department
// - course
// - details (Decription of the lost item);
// - contact(email or phone);
// - Status (Unclaimed/Unfound or Claimed);

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
    'lostitemsreports',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type:Sequelize.STRING
        },
        src: {
            type: Sequelize.STRING
        },
        yr: {
            type: Sequelize.STRING
        },
        campus: {
            type: Sequelize.STRING
        },
        department:{
            type: Sequelize.STRING
        },
        course: {
            type: Sequelize.STRING
        },
        details: {
            type: Sequelize.STRING
        },
        contact: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        seen:{
            type: Sequelize.INTEGER
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
           timestamps: false 
    })