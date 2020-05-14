// This file will be the structure for the organizations description 

// The model will contain the ff: 
// 1. Campus of the organization 
// 2. Organizations Department 
// 3. Registering Organization Name
// 4. Registering Organization President Name
// 5. Registering Organization Adviser  Name
// 6. Quantity of members 
// 7. Quantity of Officers 
// 8. Org Description 
// 9. Registering date 

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
	'orgdesc',{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		campus: {
			type: Sequelize.STRING
		},
		department: {
			type: Sequelize.STRING
		},
		orgname: {
			type: Sequelize.STRING
		},
		orgpresname: {
			type: Sequelize.STRING
		},
		orgadvisername: {
			type: Sequelize.STRING
		},
		quantitymembers: {
			type: Sequelize.STRING
		},
		quantityofficers: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING,
		},
		 created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
	}, {
	  timestamps: false 
	 }
	)