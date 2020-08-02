/*
	This file will contain the REST api's for 
	announcement process

	The api's will have the body of the ff:
	- Title of the Event
	- Date of the event
	- The date exact
	- The time of the event
	- Background Color for the Event
	- Venue (Where the event will happen)
	- Description of the Event
	- Poster(Must be jpg or jpeg or png)
	- Who announce the EVent (SOA Head or SOA Admin)

*/

const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');

//The directory where the files will be stored
const DIR = 'uploads/announcements/';

const Announcements = require('../../models/announcements.model');

const validateAnnouncements = require('../../validation/announcements');

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
	   		if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {	
   				cb(null, true)
	   		} 
	   		else {
	   		// This will throw the file as undefined because the condition is to check if the file is .docx or .pdf type file
  	 		 cb(null, false)
  	   		}
  	   // cb(null, true)
	   }
});


//@route GET /api/announcements/
//@desc Get all the announcements in the announcements table
//@access PUBLIC
router.get('/', async (req, res) => {
	const result = await Announcements.findAndCountAll();
    
        try{
            if(result) res.json(result.rows);
        }
        catch(err){
                res.status(500).json(err);
        }
});

//@route POST /api/announcements/addEvents
//@desc Add a announcements data
//@access SOA Admin and SOA Head
router.post('/addEvents', upload.single('poster'), (req, res) => {
	const poster = req.file;

	//Url of the app
	const url = req.protocol + '://' + req.get('host');

	const today = new Date();

	const { errors, isValid } = validateAnnouncements(req.body);


	if(poster === undefined) {
		return res.status(400).json({poster: 'Pictures only'})
	}


	if(!isValid) {
		return res.status(400).json(errors);
	}

	const title = req.body.title;
	
	const date = req.body.date;

	const dateDate = req.body.dateDate;
	const dateTime = req.body.dateTime;
	const venue = req.body.venue;
	const description = req.body.description;
	const bgColor = req.body.bgColor;
	const setBy = req.body.setBy;
	const fileName = req.body.fileName;

	// const newAnnouncements = {
	// 	title,
	// 	date,
	// 	venue,
	// 	description,
	// 	poster: url + '/' + poster.path
	// };

	const newAnnouncements = new Announcements({
		title,
		date,
		dateDate,
		dateTime,
		bgColor,
		venue,
		description,
		poster: url + '/' + poster.path,
		fileName,
		setBy,
		created_at: today
	});

	newAnnouncements.save()
	.then(response => res.json(response))
	.catch(err => res.status(500).json(err));	

	// console.log(newAnnouncements);

});

module.exports = router;