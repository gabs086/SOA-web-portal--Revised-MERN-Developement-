//This file will be the schema for  student organization account registration

// The Schema will have the following data
// 1. Name of the sctudent organization that is already in the organization records
// 2. Their Campus
// 3. Desired Username and Password
// 4. date of registration (default will be the current date)


const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
	'orgaccnts', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		orgname: {
			type:Sequelize.STRING
		},
		campus: {
			type: Sequelize.STRING
		},
		username: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		created_at: {
			 type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
		}
	}, {
		timestamps: false
	}
	);