// /Dependencies 
const express = require('express');
const session = require('express-session');
const cors = require("cors");
const bodyParser = require('body-parser');
const passport = require('passport');
const http = require("http");
//Requiring socket.IO
const socketIO = require("socket.io");

//API Routes
const users = require("./routes/api/users");
const laf = require('./routes/api/laf');
const campuses = require('./routes/api/campuses');
const departments = require('./routes/api/departments');

//Router
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

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
app.use(passport.initialize());
// Routes
app.use("/api/users", users);
app.use("/api/laf", laf);
app.use("/api/campuses", campuses);
app.use("/api/departments", departments);


//Getttinng the connection
io.on('connection', socket => {
    console.log(`New client connected ${socket.id}`);

      //To check if the user is connected
      socket.on('disconnect', _ => {
        console.log('user disconnected');
    });
});

server.listen(port, () => console.log(`Server is running in port ${port}`));

module.exports = io;




