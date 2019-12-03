const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");

//Router
const app = express();

//Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//DB configuration
const db = require("./config/keys").mongoURI;
//DB connection
mongoose.connect(
    db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

//PORT configuration
const port = process.env.PORT || 5000;

// APIs
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);


app.listen(port, () => console.log(`Server is running in port ${port}`));




