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


module.exports = router;