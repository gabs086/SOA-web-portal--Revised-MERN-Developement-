/* Consist of the following  schema
	-id
	-activityId
	-activityTitle
	-campus
	-studentName
	-srCode
	-campus
	-department
	-yr
	-section
	-contactNumber
	-status

*/

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
	'registeredStudents', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			activityId: {
				type: Sequelize.INTEGER
			},
			activityTitle: {
				type: Sequelize.STRING
			},
			campus: {
				type: Sequelize.STRING
			},
			studentName: {
				type: Sequelize.STRING
			},
			srCode: {
				type: Sequelize.STRING
			},
			department: {
				type: Sequelize.STRING
			},
			yr: {
				type: Sequelize.STRING
			},
			section: {
				type: Sequelize.STRING
			},
			contactNumber: {
				type: Sequelize.STRING
			},
			status: {
				type: Sequelize.STRING
			},
			created_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
			}
	}, {
		timestamps: false
	});