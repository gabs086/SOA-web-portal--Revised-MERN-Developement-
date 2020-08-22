const express = require('express');
const router = express.Router();

const RegisteredStudents = require('../../models/registeredStudents.model');

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
			id: activityId,
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
		status,
		created_at: today
	 });

	 newRegisteredStudent.save()
	 .then(response => res.json({
	 	message: 'Request submitted',
	 	datas: {response}
	 }))
	 .catch(err => res.status(500).json(err))

});


module.exports = router;