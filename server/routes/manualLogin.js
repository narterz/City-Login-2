const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('signUp')
});

router.get('/', (req, res) => {
    res.render("login")
})

router.post('signUp', (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    User.register(new User({
        email: username,
        firstName: firstName,
        lastName: lastName,
        password: password
    }), function (err, user) {
        if (err) {
            res.json({ success: false, message: "Login failed please try again" })
        } else {
            req.login(user, (err) => {
                if (err) {
                    res.json({ success: false, message: err })
                } else {
                    res.json({ success: true, message: "Account has been registered" })
                }
            });
        }
    });
});

router.post('login', (req, res) => {
    passport.authenticate("local", {failureRedirect: "/failure" }, 
    function(req, res) {
        res.redirect("/")
    })
})


module.exports = router;

