// This api will be responsible for all the HTTP request in the lost and found Form 

// The form will request the following.

    // Legend: * Important 

// - Name of the Student *
// - Their SR-Code *
// - What year that student is
// - What campus *
// - what department *
// - their course *
// - details of the lost item *
// - Contact Email or Mobile phone number) *
// -  Status of the report (default = Unfound/Unclaimed)

const express = require('express');
const router = express.Router();

const LafReports = require('../../models/laf.model');

const validateLostAndFoundInput = require('../../validation/laf');


//@rout GET api/laf/getreportlostitem
//@desc GET all reports in lost and found;
//@access PUBLIC
router.get('/getreportlostitem', async (req, res) => {
    const lafreport = await LafReports.findAll();
    
        try{
            if(lafreport)
                res.json(lafreport);
        }
        catch(err){
                res.status(500).json(err);
        }
});


//@rout POST api/laf/reportlostitem
//@desc Report lost item via lost item report form
//@access  Public
router.post('/reportlostitem', (req,res) => {
    // Error checker for the Lost and Found Process 
    const { errors, isValid } = validateLostAndFoundInput(req.body);

    if(!isValid){
        return res.status(400).json(errors)
    }

    // All the request made by the user 
    const name = req.body.name;
    const src = req.body.src;
    const yr = req.body.yr;
    const campus = req.body.campus;
    const department = req.body.department;
    const course = req.body.course;
    const details = req.body.details;
    const contact = req.body.contact;
    const status = "Unfound/Unclaimed";
    const seen = 0;

    const newLafReports = new LafReports({
        name,
        src,
        yr,
        campus,
        department,
        course,
        details,
        contact,
        status,
        seen
    });

    newLafReports.save()
    .then( _ =>{ 
        res.json('Reports Sent');
    })
    .catch(err => res.status(500).json(err));

});


module.exports = router;