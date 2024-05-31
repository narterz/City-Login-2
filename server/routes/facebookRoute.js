const express = require("express");
const router = express.Router();
require("dotenv").config({path: "../.env"});
const axios = require("axios");

let options = {
    code: "",
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
    scope: "email"
}

router.get("/auth/facebook", (req, res) => {
    console.log("This has ran")
    console.log(options)
    const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${options.client_id}&redirect_uri=${options.redirect_uri}&scope=email`;
    console.log(url)
    res.redirect(url)
});

router.get("/auth/facebook/callback", async (req, res) => {
    const { code } = req.query;
    options.code = code
    try {
        console.log("This ran!")
        const getToken = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token`, options);
        const { access_token} = getToken.data;
        const getProfile = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`);
        const profile = getProfile.data;
        console.log(profile);
        //redirect to success client
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
        //redirect to failure client
    }
})

module.exports = router;