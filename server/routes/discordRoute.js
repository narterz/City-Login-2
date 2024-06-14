const express = require("express");
const router = express.Router();
const { generateState } = require('../middleware/cryptic');
const axios = require("axios");
const { URLSearchParams } = require('url');
const { FindToken, CreateSocialUser, FetchSocialData } = require('../database/queries/socialQueries');

const {
    DISCORD_APP_ID,
    DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI,
    CLIENT_SUCCESS,
} = process.env

router.get("/auth/discord", (req, res) => {
    const stateParam = generateState();
    const params = new URLSearchParams({
        response_type: "code",
        client_id: DISCORD_APP_ID,
        redirect_uri: DISCORD_REDIRECT_URI,
        state: stateParam,
        prompt: "consent",
        scope: "identify"
    }).toString();
    const url = `https://discord.com/oauth2/authorize?${params}`
    res.redirect(url)
});

router.get("/auth/discord/callback", async (req, res, next) => {
    const { code } = req.query;
    const getUserUrl = 'https://discord.com/api/users/@me'
    const params = new URLSearchParams({
        client_id: DISCORD_APP_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: DISCORD_REDIRECT_URI
    }).toString();
    try {
        const response = await axios.post("https://discord.com/api/oauth2/token", params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        const { access_token, refresh_token } = response.data;
        const existingUser = await FindToken(access_token);
        let user;
        if(existingUser){
            user = existingUser
        } else {
            const discordUser = await FetchSocialData(getUserUrl, access_token);
            const { username, id, avatar } = discordUser;
            const data = {
                displayName: username,
                id: id,
                photo: avatar,
                accessToken: access_token,
                refreshToken: refresh_token
            }
            user = await CreateSocialUser(data);
        }
        const queryParams = new URLSearchParams({
            id: user.id,
            displayName: user.displayName,
            photo: user.photo
        }).toString();
        res.redirect(`${CLIENT_SUCCESS}?${queryParams}`);
    } catch (error) {
        next(error)
    }
})

module.exports = router