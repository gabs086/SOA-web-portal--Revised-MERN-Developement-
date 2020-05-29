/*
	This file will contain the routes for id replacement transaction
	The routes will take the data as the ff:

	name
	year
	src
	campus
	department
	idreason
	count
	otherinfo
	created_At
*/


const express = require('express');
const router = express.Router();

const IdReplacements = require('../../models/idreplacement.model');

const validateIdReplacement = require('../../validation/idreplacement')


//@route GET /api/idreplacement/getidrecords
//@desc Get all the idreplacement records
//@access Admin only
router.get('/getidrecords', async (req, res) => {

	const idreplacement = await IdReplacements.findAll();

	try{
		if(idreplacement) res.json(idreplacement);
	}
	catch(err){
		res.status(500).json(err);
	}

});

//@router POST /api/idreplacement/addidrecords
//@desc Add a record for idreplacement transaction
//@access Admin only
router.post('/addidrecords', (req,res) => {

	const today = new Date();

	const { errors , isValid } = validateIdReplacement(req.body);

	if(!isValid)
		return res.status(400).json(errors)

	const {
		name,
		year,
		src,
		campus,
		department,
		idreason,
		count,
		otherinfo
	} = req.body;

	const newIdReplacement = new IdReplacements({
		name,
		year,
		src,
		campus,
		department,
		idreason,
		count,
		otherinfo,
		created_at: today
	});

	newIdReplacement.save()
	.then( _ => res.json('Record Added'))
	.catch(err => res.status(500).json(err));
	
});

module.exports = router;