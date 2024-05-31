const express = require("express");
const router = express.Router();
const { generateState } = require('../middleware/cryptic');
const axios = require("axios");
const { URLSearchParams } = require('url');
const SocialUser = require("../models/SocialUser");

const { 
    GITHUB_CLIENT_ID, 
    GITHUB_CLIENT_SECRET, 
    GITHUB_CALLBACK_URL, 
    CLIENT_SUCCESS 
} = process.env

async function getGitHubUsers(token) {
    try {
        const response = await axios.get("https://api.github.com/user", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        return response.data
    } catch (error) {
        console.error(error)
    }
}

router.get("/auth/github", (req, res) => {
    const state = generateState();
    req.session.state = state;
    const options = {
        client_id: GITHUB_CLIENT_ID,
        redirect_uri: GITHUB_CALLBACK_URL,
        scope: "read:user",
        client_secret: GITHUB_CLIENT_SECRET,
        state: state
    }
    console.log(options)
    const params = new URLSearchParams(options).toString();
    res.redirect(`https://github.com/login/oauth/authorize?${params}`)
});

router.get("/auth/github/callback", async (req, res) => {
    try {
        const response = await axios.post("https://github.com/login/oauth/access_token", {
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: req.query.code
        }, {
            headers: {
                Accept: "application/json"
            }
        })
        const { access_token } = response.data;
        const existingUser = await SocialUser.findOne({ accessToken: token }).exec();
        if(!existingUser){
            const githubDetails = await getGitHubUsers(access_token);
            const { name, id, avatar_url } = githubDetails.data;
            const user = {
                displayName: name,
                id: id,
                accessToken: access_token,
                photo: avatar_url
            }
            req.user = user
        } else {
            req.user = existingUser
        }
        res.redirect('/success')
    } catch (error) {
        console.log(error)
    }
});

router.get("/success", (req, res) => {
    res.json(req.user)
    res.redirect(CLIENT_SUCCESS)
})

module.exports = router;