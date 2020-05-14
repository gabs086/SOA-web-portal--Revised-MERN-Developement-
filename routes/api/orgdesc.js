// This file will contain the registration of organization and their  account 

// For registration of Organizations, the data's to be needed will be
// 1. Campus of the organization 
// 2. Organizations Department 
// 3. Registering Organization Name
// 4. Registering Organization President Name
// 5. Registering Organization Adviser  Name
// 6. Quantity of members 
// 7. Quantity of Officers 
// 8. Org Description 
// 9. Registering date 

const express = require('express');
const router = express.Router();

const OrgDesc = require('../../models/orgdesc.model');

const validateOrgDesc = require('../../validation/orgdesc');

//@route GET /api/orgdesc/getorgdesc
//@desc Get all the registered organizations data
//@access Admin and Head only
router.get('/getorgdesc', async (req, res) => {
	const org = await OrgDesc.findAll();

	try{
		if(org) res.json(org);
	}
	catch(err){
		res.status(500).json(err);
	}
});

//@route POST /api/orgdesc/gaddorganization
//@DESC Add a STudent orgination in the system
//@access Admin Only
router.post('/addorganization', (req, res) => {
	const { errors, isValid } = validateOrgDesc(req.body);

	if(!isValid)
		return  res.status(400).json(errors)

	const campus = req.body.campus;
	const department = req.body.department;
	const orgname = req.body.orgname;
	const orgpresname = req.body.orgpresname;
	const orgadvisername = req.body.orgadvisername;
	const quantitymembers = req.body.quantitymembers;
	const quantityofficers = req.body.quantityofficers;
	const description = req.body.description;

	const newOrg = new OrgDesc({
		campus,
		department,
		orgname,
		orgpresname,
		orgadvisername,
		quantitymembers,
		quantityofficers,
		description
	});

	newOrg.save()
	.then( _ => {
		res.json('Organization Registered');
	})
	.catch(err => res.status(500).json(err));

});


module.exports = router;