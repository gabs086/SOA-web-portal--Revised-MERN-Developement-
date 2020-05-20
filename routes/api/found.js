// This File will contain the inputs for getting the reports of found inputs 

// The data will have the ff
// 1.findername
// 2.founditem
// 3.campus
// 4.date the item has been found
// 5.created_at


const express = require('express');
const router = express.Router();


const FoundReports = require('../../models/found.model');

const validateFoundReports = require('../../validation/found');

//@route GET /api/found/getreportfounditem
//@desc GET all the reports in the foundreports table in the database;
//@desc SOA heads only
router.get('/getreportfounditem', async (req, res) => {
		const foundreport = await FoundReports.findAll();

		try{
			if(foundreport) res.json(foundreport);
		}	
		catch(err){
			res.status(500).json(err);
		}
});

//@route POST /api/found/addfoundreport
//@desc Submit the entered input data for found form in the head
//@access SOA Head only
router.post('/addfoundreport', (req,res) => {
	const { errors, isValid } = validateFoundReports(req.body);

	if(!isValid){
		return res.status(400).json(errors);
	}

	const findername = req.body.findername;
	const founditem =  req.body.founditem;
	const campus = req.body.campus;
	const date = req.body.date;

	const newFoundReports = new FoundReports({
		findername,
		founditem,
		campus,
		date
	});

	newFoundReports.save()
	.then( _ => res.json('Found Reports Added'))
	.catch(err => res.status(500).json(err));


});

//@route DELETE /api/found/deletefoundreport/:id
//@desc Delete a found report with its specific data
//@access SOA Head Only
router.delete('/deletefoundreport/:id', (req, res) => {
	const id = req.params.id;

	FoundReports.destroy({
		where: {
			id:id
		}
	})
	.then( _ => res.json('Found Report Deleted'))
	.catch(err => res.status(500).json(`Error: ${err}`));
});

module.exports = router;