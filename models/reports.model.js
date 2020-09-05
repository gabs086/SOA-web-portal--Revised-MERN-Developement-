/*
	This will be the model schema for the reports submittion
	of all organization

	The ff. are the column names for the table

	- id 
	- orgname
	- reportTitle
	- reportDesc
	- campus
	- file
	- created_at

*/

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
	'reports', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		orgname: {
			type: Sequelize.STRING
		},
		reportTitle: {
			type: Sequelize.STRING
		},
		reportDesc: {
			type: Sequelize.STRING
		},
		campus: {
			type: Sequelize.STRING
		},
		file: {
			type: Sequelize.STRING
		},
		created_at: {
			type: Sequelize.DATE,
        	defaultValue: Sequelize.NOW
		},

	}, {
		timestamps: false
	});