// This FModel will be the model schema for found reports

// The data will have the ff
// 1.findername
// 2.founditem
// 3.campus
// 4.date the item has been found
// 5.created_at


const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
		'foundreports',{
			 id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        findername:{
        	type: Sequelize.STRING
        },
        founditem:{
        	type: Sequelize.STRING
        },
        campus: {
        	type: Sequelize.STRING
        },
        date: {
        	type: Sequelize.DATE
        },
        created_at: {
        	type: Sequelize.DATE,
        	defaultValue: Sequelize.NOW
        }
}, {
	timestamps: false
})
