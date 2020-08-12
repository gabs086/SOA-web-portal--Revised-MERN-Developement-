/*
	This file will contain the api endpoints of the 
	assessments process.

*/

const express = require('express');
const router = express.Router();

const Assessments = require('../../models/assessments.model');

//@route GET /api/assessments/
//@desc GET all data in the assessments table;
//@access org and SOA Head
router.get('/', async(req, res) => {
	const result = await Assessments.findAndCountAll();
  		
  		try{
            if(result) res.json(result.rows);
        }
        catch(err){
                res.status(500).json(err);
        }
});

module.exports = router;