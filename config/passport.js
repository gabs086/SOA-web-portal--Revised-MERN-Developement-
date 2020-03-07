const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
//The model set in the Schema

//Rework Model
const Users = require("../models/user.model");

const keys = require("./keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//the secretOrKey in the  keys.js
opts.secretOrKey = keys.secretOrKey;

//Passport authentication for the user
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Users.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};