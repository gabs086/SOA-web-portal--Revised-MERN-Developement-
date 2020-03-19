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
    const studentName = req.body.studentname;
    const srCode = req.body.sr_code;
    const studentYear = req.body.studentyear;
    const campus = req.body.campus;
    const department = req.body.department;
    const course = req.body.course;
    const details = req.body.details;
    const contact = req.body.contact;
    const status = "Unfound/Unclaimed";

    const newLafReports = new LafReports({
        studentName,
        srCode,
        studentYear,
        campus,
        department,
        course,
        details,
        contact,
        status,
    });
    newLafReports.save()
    .then(lafreport => res.json(lafreport))
    .catch(err => res.status(500).json(err));

});

//@rout GET api/laf/getreportlostitem
//@desc GET all reports in lost and found;
//@access PUBLIC
router.get('/getreportlostitem', async (req, res) => {
    const lafreport = await LafReports.find();
});

module.exports = router;