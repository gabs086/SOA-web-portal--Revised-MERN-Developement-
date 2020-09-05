//ROute file for the reporsts

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Reports = require('../../models/reports.model');
const OrgFeeds = require('../../models/org_feeds.model');

//Directory of the reports
const DIR = 'uploads/reports/';

//Validate reports
const validateReports = require('../../validation/reports');

//Diskstorage for sending the files into the assigned Directory
const storage = multer.diskStorage({
	// The destination of the file 
	destination: (req, file, cb) => {
		cb(null, DIR)
	},
	// what will be the filename of the file uploaded
	filename: (req, file, cb) => {
		// set the file name with its the date the file submitted and the filename 

		const filename = file.originalname.toLowerCase().split(' ').join('-');

		cb(null, `${filename}`);	
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

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

//@route GET /api/reports/
//@desc fetch all data in the reports table
//@access
router.get('/', async (req, res) => {
	const result = await Reports.findAll();

	try {
		if(result) res.json(result);	
	}
	catch (err) {
		res.status(500).json(err);
	}
});

//@router POST /api/reports/passReports
//@desc Send a report in the admin
//@access org only
router.post('/passReports', upload.single('file'), (req, res, next) => {
	///Request file
	const file = req.file

	const url = req.protocol + '://' + req.get('host');

	const { errors, isValid } = validateReports(req.body);

	const today = new Date();

	if(file === undefined) {
		return res.status(400).json({file: 'Note: File for the request is required, .docx and .pdf only'});
	}

	if(!isValid){
		return res.status(400).json(errors);
	}

	const { orgname, reportTitle, reportDesc, campus } = req.body;

	const newReports = new Reports({
		orgname,
		reportTitle,
		reportDesc,
		campus,
		file: url + '/' + file.path,
		created_at: today
	});


	//Try using next function();;;;

	// //Save reports body
	newReports.save()
	.then(response => res.json({
		message: 'Report Submitted',
		datas: {response}
	}))
	.catch(err => res.status(500).json(err));

});

// @route POST /api/reports/sendOrgFeed
// @desc send orgFeed to a organization
// @access org only
router.post('/sendOrgFeed', (req,res, next) => {

	//Callback for org_feeds

	const today = new Date();

	const { username, orgname, reportTitle, reportDesc } = req.body;

	if(!username || !orgname || !reportTitle || !reportDesc ){
		return res.status(400).json({
			 status: 'error',
     		 error: 'req body cannot be empty',	
		})
	}

	const newOrgFeed = new OrgFeeds({
		username,
		orgname,
		message: `You send a report entitled ${reportTitle} to admin. The report is now archived`,
		created_at: today
	});

	newOrgFeed.save()
	.then(response => res.json({
		message: 'OrgFeed recorded',
		datas: {response}
	}))
	.catch(err => res.status(500).json(err));

});




module.exports = router;