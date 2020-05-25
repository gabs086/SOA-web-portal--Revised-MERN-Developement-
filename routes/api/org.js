//This file will contain the API routes for registration of accnts for student organizations

// The user model will be involed for registration of accnt 
// The routes will have the following 
// 1. OrgName - Organization data
// 2 their specifi campus
// 3 username
// 4 password

const express = require('express');
const router = express.Router();

const Org = require('../../models/org.model');

const OrgAccntReg = require('../../models/user.model');

module.exports = router;