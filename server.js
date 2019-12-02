const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const db = require('./config/key').mongoURI;

mongoose.connect(
    db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)
    .then(_ => console.log("Mongo DB connected ..."))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, _ => console.log(`Server connected in port ${port}`));

//APIs