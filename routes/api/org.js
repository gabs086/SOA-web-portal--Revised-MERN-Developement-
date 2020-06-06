//This file will contain the API routes for registration of accnts for student organizations

// The user model will be involed for registration of accnt 
// The routes will have the following 
// 1. OrgName - Organization data
// 2 their specifi campus
// 3 username
// 4 password

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const OrgAccnts = require('../../models/org.model');

const validateOrgAccnts = require('../../validation/org');

// Model
const Users = require('../../models/user.model');

//@route GET /api/org/getorgaccnts
//@desc GET all the account registered in the database
//@access Admin only
router.get('/getorgaccnts', async (req, res) => {

	const orgAccnts = await OrgAccnts.findAll();

	try{
		if(orgAccnts) res.json(orgAccnts);
	}
	catch(err){
		res.status(400).json(err);
	};

});

//@route POST /api/org/registerorg
//@desc Record the input that will serve as a registered accnt
//@access Admin Only
router.post('/registerorg',(req, res) => {
	const { errors, isValid } = validateOrgAccnts(req.body);

	if(!isValid)
		return res.status(400).json(errors);

	const { orgname, campus, username, password } = req.body;

	// Check if there's a existing username for organiza tion
	Users.findOne({
		where: {
			username: username
		}
	})
	.then(user => {
		const today = new Date();
		if(user) {
			return res.status(400).json({username: 'Username already exist'});
		}
		else {
				// The account for the new user account of the org 
                const newUser = new Users({
                    username: req.body.username,
                    password: req.body.password,
                    type: req.body.type,
                    campus: req.body.campus,
                    created_at: today
               });	

                // The details for the account registere
                const newOrgAccnts = new OrgAccnts({
					orgname,
					campus,
					username,
					password,
					created_at:today
				});

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err) throw err;

						newUser.password = hash;

						//Saving for the newOrg Account
						newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));

                        // Saving the new details of the account 
                        newOrgAccnts.save()
						.then( _ => res.json('Org Accnt Registered'))
						.catch(err => res.status(500).json(err));

					})
				})
		}


	})

	

});

//@route GET /api/lam


module.exports = router;