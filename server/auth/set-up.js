const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy({usernameField: "email"} ,User.authenticate()));
 
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport; 