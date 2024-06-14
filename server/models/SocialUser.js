const mongoose = require("mongoose");
const { hashTokens } = require("../middleware/cryptic");

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
        unique: true,
        require: [true, "User logging in with social media must have a access token"]
    },
    refreshToken: {
        type: String,
        default: null
    },
    photo: {
        type: String,
        require: [false],
        default: ""
    },

}, { autoIndex: true, timestamps: true })

SocialUser.pre('save', async function (next) {
    if (!this.isModified('accessToken')) {
        return next();
    }
    try {
        const hashToken = hashTokens(this.accessToken);
        this.accessToken = hashToken
        if (this.refreshToken) {
            const hashedRefresh = hashTokens(this.refreshToken);
            this.refreshToken = hashedRefresh
        }
        next();
    } catch (error) {
        next(error);
    }
});
SocialUser.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

SocialUser.index({ accessToken: 1 });

module.exports = mongoose.model("SocialUser", SocialUser);