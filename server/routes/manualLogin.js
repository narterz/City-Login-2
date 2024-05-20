const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

router.post('/api/signUp', async (req, res) => {
    console.log("This ran", req.body)
    const { firstName, lastName, username, password } = req.body;
    try {
        const newUser = await User.create({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        });
        console.log(newUser)
        result = await newUser.save();
        req.user = result;
        res.status(201).json(result);
    } catch (error) {
        console.error(error)
        if (error.errors) {
            const errors = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return res.status(400).json({ errors })
        } else {
            console.error(error);
            res.status(500).json(error);
        }
    }
});

//Logins will be verified through the database using passport
router.post('/api/login', async (req, res) => {
    passport.authenticate("local", { failureRedirect: '/failure' },
        (err, req, res, done) => {
            res.json({ 
                success: true, 
                message: "User logged in",
            })
        })
        res.redirect('/success')
});

router.get("/failure", (req, res) => {
    res.render("failure")
});

router.get("/success", (req, res) => {
    res.json({user: req.user})
});

module.exports = router;

