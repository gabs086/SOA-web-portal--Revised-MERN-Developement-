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
                    campus: req.body.campus
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


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const username = req.body.username;
    const password = req.body.password;
    // Find user by email
    Users.findOne({ username }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ usernotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username,
                    //Added what type the user login
                    type: user.type
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            //added the usertype
                            type: user.type,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;