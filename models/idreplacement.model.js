/*
This file will have the model for idreplacement database table
The model chema will have the ff records

1. Name of student
2. Year in the university
3. SR-Code of the student
4. Campus of the student
5. Department of the student
6. Reason of the ID Replacement
7. Counts of ID Replacement (tara)
8. Other Information (supporting info)
9. created_at
*/

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define(
		'idreplacements',{
			 id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
        	type: Sequelize.STRING,
        },
        year:{
        	type: Sequelize.STRING
        },
        src:{
        	type: Sequelize.STRING
        },
        campus: {
        	type: Sequelize.STRING
        },
        department: {
        	type: Sequelize.STRING
        },
        idreason: {
        	type: Sequelize.STRING
        },
        count: {
        	type: Sequelize.INTEGER
        },
        otherinfo: {
        	type: Sequelize.STRING
        },
         created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
        
		},{
			timestamps: false 
		}
	);