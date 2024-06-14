const express = require("express");
const router = express.Router();
const passport = require("passport")
const { QueryLocalUser, ChangeAccount } = require("../database/queries/localQueries");

router.post('/api/signUp', async (req, res) => {
    console.log("This ran", req.body)
    const { firstName, lastName, username, password } = req.body;
    const newUser = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    };
    try {
        const queryUser = await QueryLocalUser(newUser);
        res.status(201).json(queryUser)
    } catch (error) {
        console.log(error)
        res.status(error.code).json(error)
    }
});

router.post('/api/login', (req, res, next) => {
    passport.authenticate('local', { failureRedirect: '/failure' }, (err, user, info) => {
        console.log("This is the user", user)
        if(err){
            return res.status(500).json({message: "Internal server error please try again"})
        }
        if(!user){
            return res.status(401).json({message: "Invalid credentials"})
        }
        res.status(201).json(user)
    })(req, res, next);
});

router.post("/change/login", async (req, res) => {
    const { username, password } = req.body;
    const user = { username, password }
    console.log("3: This is the user passed to backend", user)
    try {
        const updatedAccount = await ChangeAccount(user);
        res.json(updatedAccount)
    } catch (error) {
        res.status(error.code).json(error)
    }
})

module.exports = router;

