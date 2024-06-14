const express = require("express");
const router = express.Router();
const { generateState } = require('../middleware/cryptic');
const axios = require("axios");
const { URLSearchParams } = require('url');
const { CreateSocialUser, FetchSocialData } = require('../database/queries/socialQueries');

const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL,
    CLIENT_SUCCESS,
} = process.env

router.get("/auth/github", (req, res) => {
    const state = generateState();
    req.session.state = state;
    const params = new URLSearchParams({
        client_id: GITHUB_CLIENT_ID,
        redirect_uri: GITHUB_CALLBACK_URL,
        scope: "read:user",
        client_secret: GITHUB_CLIENT_SECRET,
        state: state
    }).toString()
    res.redirect(`https://github.com/login/oauth/authorize?${params}`)
});

router.get("/auth/github/callback", async (req, res, next) => {
    const { code } = req.query;
    const getUsersUrl = "https://api.github.com/user";
    try {
        const response = await axios.post("https://github.com/login/oauth/access_token", {
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: code
        }, {
            headers: { Accept: "application/json" }
        })
        const { access_token } = response.data;
        const githubUser = await FetchSocialData(getUsersUrl, access_token);
        const { login, id, avatar_url } = githubUser;
        const profile = {
            displayName: login,
            id: id,
            photo: avatar_url,
            accessToken: access_token
        }
        console.log(profile)
        const user = await CreateSocialUser(profile);
        const queryParams = new URLSearchParams({
            id: user.id,
            displayName: user.displayName,
            photo: user.photo
        }).toString();
        res.redirect(`${CLIENT_SUCCESS}?${queryParams}`);
    } catch (error) {
        next(error)
    }
});

module.exports = router;