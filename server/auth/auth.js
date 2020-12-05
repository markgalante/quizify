const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/login",
    (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                console.log("ERROR RUNNIGN LOGIN", err)
                return res.status(400).json({ errors: err + "errorr" });
            }
            if (!user) {
                console.log("NO USERS FOUND", info, req.body);
                return res.status(400).json({ errors: "No users found" });
            }
            req.logIn(user, (err) => {
                if (err) return res.status(400).json({ errors: err });
                return res.status(200).json({ success: `Logged on as ${user.id}`, user: user, session: req.session, "req.user": req.user })
            });
        })(req, res, next);
    }
);

router.get("/logout", (req, res) => {
    req.logOut();
    console.log("Logout run on the serverside");
    return res.status(200).json({ success: `Logged out` })
});

router.get("/test", (req, res) => res.send("hello"))

module.exports = router; 