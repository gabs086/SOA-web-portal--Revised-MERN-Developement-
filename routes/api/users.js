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
    Users.findOne({ 
        where:{
            username: req.body.username
        }
         })
        .then(user => {
            const today = new Date();

            if (user) {
                return res.status(400).json({ username: "Username exist" })
            }
            else {

                const newUser = new Users({
                    username: req.body.username,
                    password: req.body.password,
                    type: req.body.type,
                    campus: req.body.campus,
                    created_at: today
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
    Users.findOne({ 
        where: {
            username : req.body.username
        }
        })
        .then(user => {
            // Check if user exists
            if (!user) {
                return res.status(404).json({ usernotfound: "Username not found" });
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
                        type: user.type,
                        // Campus of the user (Whether its student, org, head or admin)
                        campus: user.campus
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
                                // added the campus of the user 
                                campus: user.campus,
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
        })
        .catch(err => console.log(err));
});

module.exports = router;