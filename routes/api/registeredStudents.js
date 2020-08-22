const express = require('express');
const router = express.Router();

const RegisteredStudents = require('../../models/registeredStudents.model');
const Notifications = require('../../models/notifications.model');

const validateRegisteredStudents = require ('../../validation/registeredStudents');

//@route GET /api/registeredStudents/
//@desc fetch all the data in registeredStudents Table
//@access student, org and SOA Head
router.get('/', async (req, res) => {
	const result = await RegisteredStudents.findAndCountAll();

	try {
		if(result) res.json(result.rows);
	}
	catch(err) {
		res.status(500).json(err);
	}
});


//@route GET /api/registeredStudents/seeRegisteredStudents/:activityId/:activityTitle
//@desc fetch the data in the registeredStudent by activityId and activityTitle that come for the assessments data
//@access org and SOA Head
router.get('/seeRegisteredStudents/:activityId/:activityTitle', async (req, res) => {
	const { activityId, activityTitle } = req.params;

	const result = await RegisteredStudents.findAndCountAll({
		where: {
			activityId: activityId,
			activityTitle: activityTitle
		}
	})

	try {
		if(result) res.json(result.rows)
	}
	catch(err) {
		res.status(500).json(err);
	}

})

//@route POST /api/registeredStudents/registerStudent
//@desc POST method for registration of a student in the activity
//@access student only
router.post('/registerStudent', (req, res) => {
	const today = new Date();

	const { errors, isValid } = validateRegisteredStudents(req.body);

	if(!isValid){
		return res.status(400).json(errors);
	}

	const { activityId, activityTitle, campus,
			studentName, srCode, department, yr,
			section, contactNumber, status
	 } = req.body;

	 const newRegisteredStudent = new RegisteredStudents({
	 	activityId, 
	 	activityTitle, 
	 	campus,
		studentName, 
		srCode, 
		department, 
		yr,
		section, 
		contactNumber, 
		status: 'pending',
		created_at: today
	 });

	 newRegisteredStudent.save()
	 .then(response => res.json({
	 	message: 'Request submitted',
	 	datas: {response}
	 }))
	 .catch(err => res.status(500).json(err))

});

//@route /api/registeredStudents/registerStudents/notif
//@desc send a notification to organization that a student with its name joined
//@access orgonly
router.post('/sendNotifToOrg', (req, res) => {
	// const { username, orgname, notification } = req.body;
	const username = req.body.username;
	const orgname = req.body.orgname;
	const notification = req.body.notification;

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


module.exports = router;