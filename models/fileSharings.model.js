/* 
This model schema is for the fileSharings table
This model will consist of

-	 - id
	 - file
	 - fileName
	 - to (who can only)
	 - created_at

*/

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
	'fileSharings', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		file: {
			type: Sequelize.STRING
		},
		fileName: {
			type: Sequelize.STRING
		},
		stud: {
			type: Sequelize.STRING
		},
		created_at: {
			type: Sequelize.DATE,
        	defaultValue: Sequelize.NOW
		}
	}, {
		timestamps: false	
	})