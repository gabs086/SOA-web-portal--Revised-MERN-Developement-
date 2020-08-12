/*
	This will be the model schema for the assessments (activity posting)

	The ff. are the column names for the table

	- id
	- activity
	- date
	- activityRequirements
	- description
	- by (name of the organization who set the activity)
	- campus (default will be the org's original campus)
	- username(confidential, for backend purposes only)
	- status(if the activity is approved by their SOA Head)
	- created_at

*/

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
	'assessments', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		activity: {
			type:Sequelize.STRING
		},
		date: {
			type:Sequelize.STRING
		},
		activityRequirements: {
			type:Sequelize.STRING
		},
		description: {
			type:Sequelize.STRING
		},
		createdBy: {
			type:Sequelize.STRING
		},
		campus: {
			type:Sequelize.STRING
		},
		username: {
			type:Sequelize.STRING
		},
		status: {
			type:Sequelize.STRING
		},
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	}, {
		timestamps: false
	});