/*
This file will contain the model schema for the notifications table

THe schema will the ff structure
1. id
2. username(Get the username of the organization who submit a request)
3. orgname(Organizta name)
4. notification(THe notification message)
5. reason(defaultValue is null, will only be updated if the request_activity
		has a status of Declined0 or Declined1)
6. status(read or '') defaultValue is ''
7. created_at
*/

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
		'notifications', {
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
			notification: {
				type: Sequelize.STRING
			},
			reason: {
				type: Sequelize.STRING,
				defaultValue: ''
			},
			status: {
				type: Sequelize.STRING,
				defaultValue: ''
			},
			created_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
			}

		}, {
			timestamps: false
		});