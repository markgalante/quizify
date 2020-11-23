const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/signiininn"
    }), (req, res) => {
        console.log("runn"); 
    }
);

router.get("/test", (req, res) => res.send("hello"))

module.exports = router; 