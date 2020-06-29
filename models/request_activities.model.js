/*
This file will contain the model schema for the request_activities 
table
The schema will have the ff structure
1. activity_title
2. file
3. description
4. orgname(Organization Name)
5. campus(what campus the organization from)
6.status of the requested_activities
	Approved0 = Approved by SOA Head
	Declined0 = Declined by SOA Head(Must Have with Reason why it is Declined)
	Approved1 = Approved by SOA Admin(Director), The final action
	Declined1 = Declined by SOA Admin(Director, Must Have with Reason why it is Declined)
7. created_at
*/

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
	'request_activities', {
		id:{
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		activity_title:{
			type: Sequelize.STRING
		},
		file : {
			type: Sequelize.STRING
		},
		fileName: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		},
		orgname: {
			type: Sequelize.STRING
		},
		username: {
			type: Sequelize.STRING
		},
		status: {
			type: Sequelize.STRING
		},
		campus: {
			type: Sequelize.STRING
		},
		notif: {
			type: Sequelize.STRING
		},
		created_at: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	}, {
	timestamps: false

	});