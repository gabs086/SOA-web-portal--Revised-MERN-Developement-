// This will be the API for inserting of campuses 
const express = require('express');
const router = express.Router();

const Campuses = require('../../models/campuses.model');

//@route GET /api/campuses/
//@DESC API for getting all the campuse
//@access Private. Devs only
router.get('/',  async (req,res) => {
    const campus = await Campuses.findAll();

    try{
        if(campus)
            res.json(campus)
    }
    catch(err){
        res.status(500).json(err);
    }
});


//@route POST /api/campuses/addcampuses
//@DESC API for insertion of new campuses
//@access Private. Devs only
router.post('/addcampuses', (req,res) => {
    const { campusname } = req.body;

    const newCampuses = new Campuses({
        campusname
    });

    newCampuses.save()
    .then(campuses => res.json(campuses))
    .catch(err => res.status(500).json(err));
});

module.exports = router;