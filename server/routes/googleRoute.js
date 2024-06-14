const express = require("express");
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const { FindToken, CreateSocialUser } = require('../database/queries/socialQueries');

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
    CLIENT_SUCCESS,
    CLIENT_FAILURE
} = process.env;

const client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL
);

router.get("/auth/google", (req, res) => {
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]
    const authorizeUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    res.redirect(authorizeUrl)
});

router.get("/auth/google/callback", async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await client.getToken(code);
        const existingUser = await FindToken(tokens.access_token);
        let user;
        if (existingUser) {
            user = existingUser;
        } else {
            client.setCredentials(tokens);
            const oauth2 = google.oauth2({
                auth: client,
                version: "v2"
            });
            const googleUser = await oauth2.userinfo.get();
            const { access_token, refresh_token } = tokens
            const { name, id, picture } = googleUser.data;
            const profile = {
                displayName: name,
                id: id,
                photo: picture,
                accessToken: access_token,
                refreshToken: refresh_token,
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
        next(error)
    }
});

module.exports = router;