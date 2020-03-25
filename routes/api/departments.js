// This file will be a private API for adding new departments in the university 

const express = require('express');
const router = express.Router();

const Departments = require('../../models/departments.model');

//@route GET /api/departments/
//@DESC API for getting all the departments
//@access Private. Devs only
router.get('/', async (req,res) =>{
    const department = await Departments.findAll();

    try{
        if(department)
            res.json(department)
    }   
    catch(err){
        res.status(500).json(err);
    }

});

//@route POST /api/departments/adddepartment
//@DESC Api for adding new department in the university
//@access Private. Devs only
router.post('/adddepartment', (req,res) => {
    const { department } = req.body;

    const newDepartment = new Departments({ department });

    newDepartment.save()
    .then(departments => res.json(departments))
    .catch(err => res.status(500).json(err));

});




module.exports = router;