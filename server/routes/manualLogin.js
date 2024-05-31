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
router.post('/api/login', (req, res, next) => {
    passport.authenticate('local', { failureRedirect: '/failure' }, (err, user, info) => {
        if (err) {
            return next(err)
        }
        req.logIn(user, (err) => {
            if (err) {
                res.status(500).json({ message: 'Login failed' });
            }
            console.log("This ran")
            res.status(200).json({ user });
        });
    })(req, res, next);
});


router.get("/failure", (req, res) => {
    res.render("failure")
});

router.get("/success", (req, res) => {
    res.json({ user: req.user })
});

module.exports = router;

