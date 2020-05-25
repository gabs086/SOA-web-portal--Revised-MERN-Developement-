//This file will contain the API routes for registration of accnts for student organizations

// The user model will be involed for registration of accnt 
// The routes will have the following 
// 1. OrgName - Organization data
// 2 their specifi campus
// 3 username
// 4 password

const express = require('express');
const router = express.Router();

const OrgAccnts = require('../../models/org.model');

const validateOrgAccnts = require('../../validation/org');

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

	const newOrgAccnts = new OrgAccnts({
		orgname,
		campus,
		username,
		password
	});

	newOrgAccnts.save()
	.then( _ => res.json('Org Accnt Registered'))
	.catch(err => res.status(500).json(err));

});


module.exports = router;