const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const DIR = 'uploads/fileSharing';

const Files = require('../../models/fileSharings.model');
const validateFiles = require('../../validation/fileSharings');

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
	   		if(file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/pdf') {	
   				cb(null, true)
	   		} 
	   		else {
	   		// This will throw the file as undefined because the condition is to check if the file is .docx or .pdf type file
  	 		 cb(null, false)
  	   		}
  	   // cb(null, true)
	   }
});

//@route GET /api/fileSharings/
//@desc fetch all the data in fileSharing table
//@access public
router.get('/', async (req,res) => {
	const result = await Files.findAndCountAll();

	try {
		if(result) res.json(result.rows);
	}
	catch(err) {
		res.status(500).json(err);
	}
});

//@router GET /api/fileSharings/:to
//@desc fetch all data depending who will receive it
//@aaccess student and org only
router.get('/:stud', async (req, res) => {
	const result = await Files.findAndCountAll({
		where: {
			stud: req.params.stud
		}
	});

	try {
		if(result) res.json(result.rows);
	}
	catch(err) {
		res.status(500).json(err);
	}

});

//@route POST /api/fileSharings/shareFiles
//@desc send file to chosen customers(student, org)
//@access admin only
router.post('/shareFiles', upload.single('file'), (req, res) => {
	const file = req.file;

	const url = req.protocol + '://' + req.get('host');

	const { errors, isValid } = validateFiles(req.body);

	const today = new Date();

	if(file === undefined) {
		return res.status(400).json({file: 'Note: File for the request is required, .docx and .pdf only'});
	}

	if(!isValid){
		return res.status(400).json(errors);
	}

	const { fileName, stud } = req.body;

	const newFiles = new Files({
		file: url + '/' + file.path,
		fileName: fileName,
		stud,
		created_at: today
	});

	newFiles.save()
	.then(response => res.json({
		message:'Request submitted',
		datas: {response}
	}))
	.catch(err => res.status(500).json(err));

});

module.exports = router;