const express = require("express");
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');

//TODO: Testing awaiting the changes made to redirect uris

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

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

//
router.get("/auth/google/callback", async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: client,
            version: "v2"
        });
        const googleUser = await oauth2.userinfo.get();
        res.json(googleUser)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;