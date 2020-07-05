/*This file will contain the models of request_activities,
notifications and org_feeds table. 

This file also have the api's for the processing of request_activities
in the org side.
*/

const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

//The directory where the files will be stored
const DIR = 'uploads/request_activities/';

//Models Involve
const RequestActivities = require('../../models/request_activities.model');
const Notifications = require('../../models/notifications.model');
const OrgFeeds = require('../../models/org_feeds.model');

//validations
const validateRequestActivities = require('../../validation/request_activities');

//Diskstorage for sending the files into the assigned Directory
const storage = multer.diskStorage({
	// The destination of the file 
	destination: (req, file, cb) => {
		cb(null, DIR)
	},
	// what will be the filename of the file uploaded
	filename: (req, file, cb) => {
		// set the file name with its the date the file submitted and the filename 
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const dateFull = `${day}-${month}-${year}`;

		// the filename format 
		const filename = file.originalname.toLowerCase().split(' ').join('-');

		cb(null, `${dateFull}_${filename}`);
	}

});
// The upload and the checking if the file is not a docx type of pdf type 
const upload = multer({
	 storage: storage,
	   fileFilter: (req, file, cb) => {
	   		if(file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/pdf') {	
   				cb(null, true)
	   		} 
	   		else {
	   		// This will throw the file as undefined because the condition is to check if the file is .docx or .pdf type file
  	 		 cb(null, false)
  	   		}
	   }
});

//@route GET /api/requestactivities/getrequestactivities
//@desc GET all the data in the request_activities table
//@access student org, SOA Heads and Administrator
router.get('/getrequestactivities', async (req, res) => {
	const request_activities = await RequestActivities.findAll();

	try{
		if(request_activities) res.json(request_activities)
	}
	catch(err){
		res.status(500).json(err);
	}
});

//@route GET /api/requestactivities/getorgfeeds
//@desc GET the org feeds save in the database. Can be filtered in the client side
//@access org only
router.get('/getorgfeeds', async (req, res) => {
	const orgfeeds = await OrgFeeds.findAll();

	try {
		if(orgfeeds) res.json(orgfeeds)
	}
	catch(err) {
		res.status(500).json(err)
	}
});

//@route POST /api/requestactivities/submitrequest
//@desc submit a request activity to the soa HEAD the to the director
//The form will need files
//@access org only
router.post('/submitrequest', upload.single('file'), (req, res) => {
// 	// dont forget to include this in the form
// 	// enctype   =  "multipart/form-data

const file = req.file;

// Url of the web app
const url = req.protocol + '://' + req.get('host');

const { errors, isValid } = validateRequestActivities(req.body);

const today = new Date();
	
	// This will be the error handling of the file if the mimetype is not .docx or .pdf 
	//The file will be automatically undefined if the file is not a .docx or .pdf type
	if(file === undefined){
		return res.status(400).json({file: 'Note: File for the request is required, .docx and .pdf only'});
	};

	if(!isValid){
		return res.status(400).json(errors);
	} 

	const { 
		//Body for the requested activities
		activity_title, description, orgname, status, campus, fileName,
		// Body for the orgFeeds
		username

	} = req.body;

	// Saving of the req.body in the RequestActivities model 
	const newRequestActivities = new RequestActivities({
		activity_title,
		file: url + '/' + file.path,
		fileName: fileName,
		description,
		orgname,
		username,
		status:'Approved0',
		campus,
		notif: '',
		created_at: today
	});

	// The OrgFeeds 	
	const newOrgFeeds = new OrgFeeds({
		username,
		orgname,
		message: `You submitted ${activity_title} request activity to your SOA HEAD`,
		created_at: today
	});

	// For saving the data submitted for new request_activities
	newRequestActivities.save()
	.then(response => res.json({
		message:'Request submitted',
		datas: {response}
	}))
	.catch(err => res.status(500).json(err));

	// for saving the data for the orgfeeds 
	newOrgFeeds.save()
	.then(orgfeed => res.json(orgfeed))
	.catch(err => res.status(500).json(err));

});

//@route GET /api/requestactivities/countheadrequest/:campus
//@desc Count the total request mad by student organizations that will be filter by campus
//@access SOA Head only
router.get('/countheadrequest/:campus', async (req, res) => {

		const result = await RequestActivities.findAndCountAll({
			where: {
				notif: '',
				campus: req.params.campus
			}
		});

		try {
			if(result) res.json(result.count)
		}	
		catch(err) {
			res.status(400).json("Cant Count data")
		}
});

//@route POST /api/requestactivities/updatecountheadrequest/:campus
//@desc Update the notif column with read0 for the notif count to decrease
//@access SOA Head only
router.post('/updatecountheadrequest/:campus', (req, res) => {

	const { notif } = req.body;

	//Find the Request Activities who's campus is equal to the params of the route
	RequestActivities.update(
	{ notif: notif },
	{ where: { campus: req.params.campus } }
	)
	.then(campuses => {
		res.json(campuses);
		})
	.catch(err => res.status(500).json(`Error: ${err}`))
});

//@route POST /api/requestactivities/approverequestactivityhead/:id
//@desc update the request activity in Approved1 if the head accept the request_activity send
//@access SOA Head Only
router.post('/approverequestactivityhead/:id', (req,res) => {
	const id = req.params.id

	
	// for updating the Status of the request activity to Approved1
	const status = req.body.status;

	// Find the RequestActivities by id
	RequestActivities.findByPk(id)
	.then(response => {

		response.status = status;

		response.save()
		.then(_ => res.json('Request Approved by SOA Head'))
		.catch(err => res.status(500).json(`Error: ${err}`))
	})
	.catch(err => res.status(500).json(err));


});

//@route POST /api/requestactivities/approverequestactivityhead/notif
//@desc save a notification for the organization if the  request activity is approved
//@access SOA Head

router.post('/requestactivityapproved/notif', (req,res) => {
		// Getting the body for the notifications 
	const username = req.body.username;
	const orgname = req.body.orgname;
	const notification = req.body.notification;

	// Saving message for notification
	const newNotification = new Notifications({
		username,
		orgname,
		notification: `Your request activity title ${notification} has been approved by the SOA Head`
	});

	newNotification.save()
	.then(_ => {
		res.json('Notification Sent')
	})
	.catch(err => res.status(500).json(err));

});

//@route POST /api/requestactivities/declinerequestactivityhead/:id
//@desc update the request_activity in Declined1 with the reason why it is declined
//@access SOA Head Only
router.post('/declinedrequestactivityhead/:id', (req,res) => {

	const id = req.params.id;

	// Requirement to have a reason if the request is declined 
	const reason = req.body.reason;

	// for updating the Status of the request activity to Approved1
	const status = req.body.status;

	RequestActivities.findByPk(id)
	.then(response => {
		response.status = status;

		response.save()
		.then(_ => res.json('Request Declined by SOA Head'))
		.catch(err => res.status(500).json(`Error: ${err}`))

	})
	.catch(err => res.status(500).json(err));

});

//@route /api/requestactivities/declinerequestactivityhead/notif
//@desc save a notification with reason if the request activity is declined
//@access SOA HEad
router.post('/requestactivitydeclined/notif', (req, res) => {

		// Getting the body for the notifications 
	const username = req.body.username;
	const orgname = req.body.orgname;
	const notification = req.body.notification;
	const reason = req.body.reason;

const newNotification = new Notifications({
		username,
		orgname,
		notification:`Your request activity title ${notification} has been declined by the SOA Head`,
		reason
	});

	newNotification.save()
	.then( _ => res.json('Notification Sent'))
	.catch(err => res.status(500).json(`Error: ${err}`));
});


module.exports = router;