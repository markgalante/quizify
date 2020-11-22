const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    });
});

passport.use(
    new LocalStrategy(
        { usernameField: "email" }, (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) return done(null, false, { message: "Incorrect email or email does not exist" })
                    if (!user.validPassword(password)) {
                        return done(null, false, { message: "Incorrect password" })
                    }
                    return (null, user); 
                }).catch(err => done(err))
        }
    )
);

module.exports = passport; 