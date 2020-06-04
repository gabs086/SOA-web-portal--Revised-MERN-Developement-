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

const IdReplacements = require('../../models/idreplacements.model');

const validateIdReplacements = require('../../validation/idreplacements')


//@route GET /api/idreplacements/getidrecords
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

//@router POST /api/idreplacements/addidrecords
//@desc Add a record for idreplacement transaction
//@access Admin only
router.post('/addidrecords', (req,res) => {

	// const today = new Date();

	const { errors , isValid } = validateIdReplacements(req.body);

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
		// created_at: today
	});

	newIdReplacement.save()
	.then(response => res.json(response))
	.catch(err => res.status(500).json(err));
	
});

//@route POST /api/idreplacements/updateidrecord/:id
//@@desc Update a record in idreplacments with its specific ID
//@access Admin only
router.post('/updateidrecord/:id',(req, res) => {
	const id = req.params.id;

	// const today = new Date();

	//validation for checking the inputs in update
	const { errors, isValid } = validateIdReplacements(req.body);

	if(!isValid)
		return res.status(400).json(errors);

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

	IdReplacements.findByPk(id)
	.then(replace => {
		if(replace.name === name &&
		   replace.year === year &&
		   replace.src === src &&
		   replace.campus === campus &&
		   replace.department === department &&
		   replace.idreason === idreason &&
		   replace.count === count &&
		  	replace.otherinfo === otherinfo
			)	{
			errors.all = "No data have been change";

			return res.status(400).json(errors);

		} else {
			replace.name = name;
			replace.year = year;
			replace.src = src;
			replace.campus = campus;
			replace.department = department;
			replace.idreason = idreason;
			replace.count = count;
			replace.otherinfo = otherinfo;

			replace.save()
			.then(response => res.json(response))
			.catch(err => res.status(500).json(`Error: ${err}`));
		}

	})
	.catch(err => res.status(500).json(`Error ${err}`));

});

module.exports = router;