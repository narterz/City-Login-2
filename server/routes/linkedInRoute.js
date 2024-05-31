const express = require("express");
const router = express.Router();
const { generateState } = require('../middleware/cryptic');
const axios = require("axios");
const { URLSearchParams } = require('url');
const SocialUser = require("../models/SocialUser");
const { GetUsers } = require("../middleware/auth");

const {
    LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET,
    LINKEDIN_CALLBACK_URL,
    CLIENT_SUCCESS,
    CLIENT_FAILURE
} = process.env;

const stateParam = generateState();

//TODO: Store access token, handle redirect to success and failure

router.get("/auth/linkedin", (req, res) => {
    const params = new URLSearchParams({
        response_type: "code",
        client_id: LINKEDIN_CLIENT_ID,
        redirect_uri: LINKEDIN_CALLBACK_URL,
        state: stateParam,
        scope: "openid profile email"
    }).toString()
    const baseURL = "https://www.linkedin.com/oauth/v2/authorization?";
    const url = `${baseURL}${params}`;
    res.redirect(url)
});

router.get("/auth/linkedin/callback", async (req, res) => {
    const { state, code } = req.query;
    const params = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
        redirect_uri: LINKEDIN_CALLBACK_URL
    }).toString();
    if (state !== stateParam) {
        res.redirect("/failure");
        //return a 404 of unauthorized user
    }
    const baseURL = "https://www.linkedin.com/oauth/v2/accessToken";
    const tokenUrl = "https://api.linkedin.com/v2/me"
    try {
        const response = await axios.post(baseURL, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const { access_token, refresh_token } = response.data;
        const existingUser = await SocialUser.findOne({ accessToken: access_token }).exec();
        if(!existingUser){
            const linkedInData = await GetUsers(tokenUrl, access_token);
            console.log(linkedInData)
        }
        //redirect to success
    } catch (error) {
        console.error(error);
        res.redirect(CLIENT_FAILURE)
    }
})



module.exports = router;
