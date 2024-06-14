const express = require("express");
const router = express.Router();
const axios = require("axios");
const { URLSearchParams } = require('url');
const { generateState } = require("../middleware/cryptic");
const { FindToken, CreateSocialUser} = require('../database/queries/socialQueries');

const {
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    FACEBOOK_REDIRECT_URI,
    CLIENT_SUCCESS,
} = process.env;

router.get("/auth/facebook", (req, res) => {
    const state = generateState();
    req.session.state = state;
    let params = new URLSearchParams({
        client_id: FACEBOOK_APP_ID,
        redirect_uri: FACEBOOK_REDIRECT_URI,
        state: state,
        response_type: "code",
        scope: "public_profile"
    }).toString();
    const url = `https://www.facebook.com/v20.0/dialog/oauth?${params}`;
    res.redirect(url)
});

router.get("/auth/facebook/callback", async (req, res, next) => {
    const { code, state } = req.query;
    try {
        const getToken = await axios.post(`https://graph.facebook.com/v20.0/oauth/access_token?`, {
            client_id: FACEBOOK_APP_ID,
            redirect_uri: FACEBOOK_REDIRECT_URI,
            client_secret: FACEBOOK_APP_SECRET,
            code: code
        });
        const { access_token } = getToken.data;
        const existingUser = await FindToken(access_token);
        let user;
        if (existingUser) {
            user = existingUser
        } else {
            const facebookUser = await axios.get(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${access_token}`);
            const { id, name } = facebookUser.data;
            const photo = facebookUser.data.picture.data.url;
            const profile = {
                displayName: name,
                id: id,
                photo: photo,
                accessToken: access_token
            }
            user = await CreateSocialUser(profile);
        }
        const queryParams = new URLSearchParams({
            id: user.id,
            displayName: user.displayName,
            photo: user.photo
        }).toString();
        res.redirect(`${CLIENT_SUCCESS}?${queryParams}`);
    } catch (error) {
        console.log(error)
        next(error)
    }
});

module.exports = router;