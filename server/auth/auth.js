const express = require("express");
const router = express.Router(); 
const passport = require("passport"); 

router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/signin"
    })
);

router.get("/test", (req, res)=> res.send("hello"))

module.exports = router; 