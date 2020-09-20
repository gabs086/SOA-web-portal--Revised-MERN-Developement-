	// /Dependencies 
const express = require('express');
const session = require('express-session');
const cors = require("cors");
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
//API Routes
const users = require("./routes/api/users");
const lost = require('./routes/api/lost');
const found = require('./routes/api/found');
const campuses = require('./routes/api/campuses');
const departments = require('./routes/api/departments');
const orgdesc = require('./routes/api/orgdesc');
const org = require('./routes/api/org');
const idreplacements = require('./routes/api/idreplacements');
const requestActivities = require('./routes/api/request_activities');
const announcements = require('./routes/api/announcements');
const assessments = require('./routes/api/assessments');
const registeredStudents = require('./routes/api/registeredStudents');
const reports = require('./routes/api/reports');
const fileSharings = require('./routes/api/fileSharings');

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

//Middleware
// Added a static folder for the accessing the downloads 
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(bodyParser.json());

//Production
app.use(express.static(path.join(__dirname, './client/public')));

app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname, './client/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.use(session(sess));

app.use((req, res, next) => {
	console.log(req.session);
	next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Credentials', true);
        return res.status(200).json({});
    }
    next();
});


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
app.use("/api/requestactivities", requestActivities);
app.use("/api/announcements", announcements);
app.use("/api/assessments", assessments);
app.use("/api/registeredStudents", registeredStudents);
app.use("/api/reports", reports);
app.use("/api/fileSharings", fileSharings);

//PORT configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
