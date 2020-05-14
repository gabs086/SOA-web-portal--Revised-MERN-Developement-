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

const LostReports = require('../../models/lost.model');

const validateLostAndFoundInput = require('../../validation/laf');

//@rout GET api/laf/getreportlostitem
//@desc GET all reports in lost and found;
//@access PUBLIC
router.get('/getreportlostitem', async (req, res) => {
    const lostreport = await LostReports.findAll();
    
        try{
            if(lostreport) res.json(lostreport);
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

    const newLostReports = new LostReports({
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

    newLostReports.save()
    .then( _ =>{ 
        res.json('Reports Sent');
    })
    .catch(err => res.status(500).json(err));

});

//@route POST /api/laf/setasfounditem/:id
//@desc Update the lost item report status to "Found, Not claimed" Status.
//@access SOA Heads Only
router.post('/setasfounditem/:id', (req,res) => {

    const id = req.params.id;

    LostReports.findByPk(id) 
    .then(reports => {
            reports.status = req.body.status;

            reports.save()
            .then(_ => res.json('Report has been set to found status'))
            .catch(err => res.status(500).json(`Error: ${err}`));
    })
    .catch(err => res.status(500).json(err));
}); 

//@route POST /api/lost/setasclaimeditem/:id
//@desc Update the lost item report status to "Found and Claimed" status
//@access SOA Heads only
router.post('/setasclaimeditem/:id', async (req,res) => {
   
    const id = req.params.id;

    const reports = await LostReports.findByPk(id);
    try{
       if(reports){
            reports.status = req.body.status;

            reports.save()
            .then( _ => res.json('Report has been set to claimed status'))
            .catch(err => res.status(500).json(`Error: ${err}`))
        } 
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;