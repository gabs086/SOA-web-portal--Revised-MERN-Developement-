/*
	This file will contain the api endpoints of the 
	assessments process.

*/

const express = require('express');
const router = express.Router();

const Assessments = require('../../models/assessments.model');

const validateAssessment = require('../../validation/assessments');

//@route GET /api/assessments/
//@desc GET all data in the assessments table;
//@access org and SOA Head
router.get('/', async(req, res) => {
	const result = await Assessments.findAndCountAll();
  		
  		try{
            if(result) res.json(result.rows);
        }
        catch(err){
                res.status(500).json(err);
        }
});

//@route GET /api/assessments/:activity
//@desc get data by specific activity
//@access student, org and SOA Head
router.get('/:activity', async (req,res) => {
	const result = await Assessments.findAndCountAll({
		where: {
			activity: req.params.activity
		}
	});

		try{
            if(result) res.json(result.rows);
        }
        catch(err){
                res.status(500).json(err);
        }

});

//@route POST /api/assessments/addActivity
//@desc adding a activity for the students to join
//@acess org only
router.post('/addActivity', (req, res) => {
	const today = new Date();

	const { errors, isValid } = validateAssessment(req.body);

	if(!isValid){
		return res.status(400).json(errors)
	}

	const { activity, date, activityRequirements, 
			description, createdBy, campus, username,
		} = req.body;

	const newAssessments = new Assessments({
		activity, 
		date, 
		activityRequirements,
		description, 
		createdBy, 
		campus, 
		username,
		status: 'pending'
	})

	newAssessments.save()
	.then(response => res.json({
		message:'Request submitted',
		datas: {response}
	}))
	.catch(err => res.status(500).json(err));

});

module.exports = router;