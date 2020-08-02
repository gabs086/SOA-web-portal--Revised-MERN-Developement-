/* 
This model schema is for the announcement table
This model will consist of

-	 - id
	 - title
	 - date
	 - dateDate
	 - dateTime
	 - bgColor
	 - venue
	 - description
	 - poster
	 - setBy
	 - created_at

*/

const Sequelize = require('sequelize');
const db = require('../config/db');


module.exports = db.sequelize.define(
	'announcements', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: Sequelize.STRING
		},
		date: {
			type: Sequelize.STRING,
		},
		dateDate: {
			type: Sequelize.STRING
		},
		dateTime: {
			type: Sequelize.STRING
		},
		backgroundColor: {
			type: Sequelize.STRING
		},
		venue: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		},
		poster: {
			type: Sequelize.STRING
		},
		fileName: {
			type: Sequelize.STRING
		},
		setBy: {
			type: Sequelize.STRING
		},
		created_at: {
			type: Sequelize.DATE,
        	defaultValue: Sequelize.NOW
		},
	}, {
		timestamps: false	
	})