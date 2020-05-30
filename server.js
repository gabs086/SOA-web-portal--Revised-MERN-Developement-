	// /Dependencies 
const express = require('express');
const session = require('express-session');
const cors = require("cors");
const bodyParser = require('body-parser');
const passport = require('passport');

//API Routes
const users = require("./routes/api/users");
const lost = require('./routes/api/lost');
const found = require('./routes/api/found');
const campuses = require('./routes/api/campuses');
const departments = require('./routes/api/departments');
const orgdesc = require('./routes/api/orgdesc');
const org = require('./routes/api/org');
const idreplacements = require('./routes/api/idreplacements');

//Router
const app = express();

//Sessions
let sess = {
    secret: 'soa-portal-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}
// Session for production and test development 
if(app.get('env') === 'production'){
    app.set('trust proxy', 1); 
    sess.cookie.secure = true;
}
app.use(session(sess));

//Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(bodyParser.json());


//PORT configuration
const port = process.env.PORT || 5000;

// APIs
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/lost", lost);
app.use("/api/found", found);
app.use("/api/campuses", campuses);
app.use("/api/departments", departments);
app.use("/api/orgdesc", orgdesc);
app.use("/api/org", org);
app.use("/api/idreplacements", idreplacements);

app.listen(port, () => console.log(`Server is running in port ${port}`));
