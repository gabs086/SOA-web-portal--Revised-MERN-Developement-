/*
This file will contain the model schema org_feeds table

Thec schema will have the ff structure

1. id
2. username(The username of the organization, for filtering)
3. orgname(Organization Name)
4. message(The message to be feed in their history)
5. created_at
*/

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
	'org_feeds', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: Sequelize.STRING
		},
		orgname: {
			type: Sequelize.STRING
		},
		message: {
			type: Sequelize.STRING
		},
		created_at: {
			type: Sequelize.DATE
		}
	}, {
		timestamps: false
	});