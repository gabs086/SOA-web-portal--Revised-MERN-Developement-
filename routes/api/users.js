const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const keys = require('../../config/keys');

//Validtion
const validateLoginInput = require('../../validation/login');

// Model
const Users = require('../../models/user.model');

//@route POST api/users/register
//@desc Register a user through api
//@access Through Routes only

router.post('/register', (req, res) => {

    //Checking of similar username
    Users.findOne({ username: req.body.username })
        .then(user => {

            if (user) {
                return res.status(400).json({ username: "Username exist" })
            }
            else {

                const newUser = new Users({
                    username: req.body.username,
                    password: req.body.password,
                    type: req.body.type,
                    campus: req.body.username
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })

});


//@route POST api/users/login
//@desc Authentication of the registered user
//@access Public

module.exports = router;