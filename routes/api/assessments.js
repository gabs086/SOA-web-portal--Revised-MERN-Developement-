/*
	This file will contain the api endpoints of the 
	assessments process.

*/

const express = require('express');
const router = express.Router();

const Assessments = require('../../models/assessments.model');
const Notifications = require('../../models/notifications.model');

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

//@route /api/assessments/setAsApproved/:id
//@desc set a activity report as approved
//@access SOA Head only
router.post('/setAsApproved/:id',  (req, res) => {
	const id = req.params.id;

	Assessments.findByPk(id)
	.then(response => {
		response.status = req.body.status;

		response.save()
		.then(data => res.json({
			message:'activity Approved',
			datas: {data}
		}))
		.catch(err => res.status(500).json(err));
	})
	.catch(err => res.status(500).json(err));
});

//@route /api/assessments/setAsDeclined/:id
//@desc set a activity assessment to declined
//@access SOA head only
router.post('/setAsDeclined/:id', (req, res) => {
	const id = req.params.id;

	Assessments.findByPk(id)
	.then(response => {
		response.status = req.body.status;


		response.save()
		.then(data => res.json({
			message:'activity Declined',
			datas: {data}
		}))
		.catch(err => res.status(500).json(err));
	})
	.catch(err => res.status(500).json(err));

});

//@route /api/assessments/activityAssessment/notif
//@desc send a notification to an organization about the status of their to be implemented activity
//@access SOA Head only
router.post('/activityAssessment/notif', (req, res) => {
		// Getting the body for the notifications 
	const username = req.body.username;
	const orgname = req.body.orgname;
	const notification = req.body.notification;

		// Saving message for notification
	const newNotification = new Notifications({
		username,
		orgname,
		notification
	});

	newNotification.save()
	.then(_ => {
		res.json('Notification Sent')
	})
	.catch(err => res.status(500).json(err));
});


//@route /api/assessments/activityAssessmentDeclined/notif
//@desc send a notification to an organization about the status of their to be implemented activity with a reason
//@access SOA Head only
router.post('/activityAssessmentDeclined/notif', (req, res) => {
		// Getting the body for the notifications 
	const username = req.body.username;
	const orgname = req.body.orgname;
	const notification = req.body.notification;
	const reason = req.body.reason

		// Saving message for notification
	const newNotification = new Notifications({
		username,
		orgname,
		notification,
		reason
	});

	newNotification.save()
	.then(_ => {
		res.json('Notification Sent')
	})
	.catch(err => res.status(500).json(err));
});

//@route /api/asssessments/setAgainToPending/:id
//@desc set again a activity to pending
//@access SOA Head only
router.post('/setAgainToPending/:id', (req, res) => {
	const id = req.params.id;

	Assessments.findByPk(id)
	.then(response => {
		response.status = req.body.status;


		response.save()
		.then(data => res.json({
			message:'activity Declined',
			datas: {data}
		}))
		.catch(err => res.status(500).json(err));
	})
	.catch(err => res.status(500).json(err));

});

//@route  GET /api/assessments/getAssessments/:id/:activity
//@DESC Fetch the data in the assessments table by id and activity parameter
//@access updated later
router.get('/getAssessments/:id/:activity', (req, res) => {
	const { id, activity } = req.params;

	// find a common activity assessment
	Assessments.findOne({
		where : {
			id: id,
			activity: activity
		}
	})
	.then(response => {
		res.json(response)
	})
	.catch(err => res.status(500).json(err));



});

module.exports = router;