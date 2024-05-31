const mongoose = require("mongoose");
const { hashCreds } = require("../middleware/cryptic");

const SocialUser = new mongoose.Schema({
    displayName: {
        type: String,
        unique: false,
        require: [true, "User must have a display name"]
    },
    id: {
        type: String,
        unique: true,
        require: [true, "User must have a unique ID"]
    },
    accessToken: {
        type: String,
        unique: false,
        require: [true, "User logging in with social media must have a access token"]

    },
    refreshToken: {
        type: String,
        unique: false,
        require: [false]
    },
    photo: {
        type: String,
        require: [false],
        default: ""
    }
})

SocialUser.pre('save', async function (next) {
    const hashedToken = await hashCreds(this.accessToken)
    if(this.refreshToken){
        const hashedRefreshToken = await hashCreds(this.refreshToken);
        this.refreshToken = hashedRefreshToken
    }
    this.refreshToken = hashedToken
    next();
});

SocialUser.index({ createdAt: 1 }, {expireAfterSeconds: 86400});

module.exports = mongoose.model("SocialUser", SocialUser);