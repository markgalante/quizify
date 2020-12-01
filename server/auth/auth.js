const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/login",
    (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            console.log("BEFORE", req.user);
            if (err) {
                console.log("ERROR RUNNIGN LOGIN", err)
                return res.status(400).json({ errors: err });
            }
            if (!user) {
                console.log("NO USERS FOUND", { info }, req.body);
                return res.status(400).json({ errors: "No users found" });
            }
            req.logIn(user, (err) => {
                if (err) return res.status(400).json({ errors: err });
                // console.log("Logged on as", req.user.id);
                console.log(req.user);
                return res.status(200).json({ success: `Logged on as ${user.id}`, user: user, session: req.session, "req.user": req.user })
            });
        })(req, res, next);
    }
);

router.get("/test", (req, res) => res.send("hello"))

module.exports = router; 