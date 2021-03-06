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

		// the filename format 
		const filename = file.originalname.toLowerCase().split(' ').join('-');

		cb(null, `${filename}`);
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

//@route GET /api/announcements/:id
//@desc Get the data by specific id parameter
//@access admin only
router.get('/:id', (req, res) => {

	const id = req.params.id;

	Announcements.findByPk(id)
	.then(response => res.json(response))
	.catch(err => res.status(400).json(`Error: ${err}`));

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

	if(!isValid) {
		return res.status(400).json(errors);
	}
	else if(poster === undefined) {
		return res.status(400).json({poster: 'Pictures only'})
	}
	else {

	const { title, date, dateDate, dateTime, backgroundColor,
			venue, description, setBy, fileName } = req.body;

	const newAnnouncements = new Announcements({
		title,
		date,
		dateDate,
		dateTime,
		backgroundColor,
		venue,
		description,
		poster: url + '/' + poster.path,
		fileName,
		setBy,
		created_at: today
	});

	newAnnouncements.save()
	.then(response => res.json({
		message:'Request submitted',
		datas: {response}
	}))
	.catch(err => res.status(500).json(err));	
	}

	// console.log(newAnnouncements);

});

router.get("/:poster", (req,res) => {
	const poster  = req.params.poster;
	res.sendFile(path.join(__dirname, `./uploads/announcements/${poster}`))
})

//@route DELETE /api/announcements/deleteannouncement/:id
//@desc Delete a data for announcement
//@admin only
router.delete('/deleteannouncement/:id', (req, res) => {

	const id = req.params.id;

	Announcements.destroy({
		where: {
			id: id
		}
	})
	.then(_ => res.json('Announcements Deleted'))
	.catch(err => res.status(500).json(`Error: ${err}`));

});

//@route POST /api/announcements/updateannouncement/:id
//@desc update a announcement
//@access admin only
// const postUpload = upload.fields([{ name: 'poster', maxCount: 1}])\
// upload.single('poster'),
router.post('/updateannouncement/:id', upload.single('poster'), (req, res) => {
	
	// console.log(req.body);

	//For  Updating a file that is in the db already
	const poster = req.file;

	const id = req.params.id;

	//Url of the app
	const url = req.protocol + '://' + req.get('host');

	const today = new Date();

	//Validators
	const { errors, isValid } = validateAnnouncements(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	}

	else if(poster === undefined) {
		return res.status(400).json({poster: 'Reupload your banner. Note: Pictures only'})
	}
	else{
		const title = req.body.title;
	
	const date = req.body.date;

	const dateDate = req.body.dateDate;
	const dateTime = req.body.dateTime;
	const venue = req.body.venue;
	const description = req.body.description;
	const backgroundColor = req.body.bgColor;
	const setBy = req.body.setBy;
	const fileName = req.body.fileName;
	const posterReq = url + '/' + poster.path;

	Announcements.findByPk(id)
	.then(response => {
		if(response.title === title 
			&& response.date === date 
			&& response.dateDate === dateDate 
			&& response.dateTime === dateTime 
			&& response.backgroundColor === backgroundColor 
			&& response.venue === venue 
			&& response.description === description 
			&& response.poster === posterReq 
			&& response.fileName === fileName 
			&& response.setBy === setBy){

			errors.all = "No data have been change";

			return res.status(400).json(errors);
		}
			response.title = title;
			response.date = date;
			response.dateDate = dateDate;
			response.dateTime = dateTime;
			response.venue = venue;
			response.description = description;
			response.backgroundColor = backgroundColor;
			response.setBy = setBy;
			response.fileName = fileName;
			response.poster = posterReq;

			response.save()
			.then(resp => res.json({
				message:'Request updated',
				datas: {resp}
			}))
			.catch(err => res.status(500).json(`Error ${err}`))
	})
	.catch(err => res.status(500).json(`Error Main: ${err}`));
	}
	
});


/* Creating a query that will get the id and the dateStr of the event in ht calendar*/

//@route /api/announcements/getByDate/:dateDate
//@desc get the data by the parameter date
//@access Public
router.get('/getByDate/:dateDate', async (req,res) => {

	const result = await Announcements.findAndCountAll({
		where: {
			dateDate: req.params.dateDate
		}
	});

	try {
		if (result) res.json(result.rows);
	}
	catch (err) {
		res.status(500).json("Cant Count Data");
	}

});


module.exports = router;