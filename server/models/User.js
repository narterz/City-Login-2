const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { hashTokens } = require('../middleware/cryptic');

const User = new mongoose.Schema({    
    firstName: {
        type: String,
        unique: false,
    },
    lastName: {
        type: String,
        unique: false,
    },
    username: {
        type: String,
        require: [true, "This is required"],
    },
    password: {
        type: String,
        required: [true, "This is required"],
        unique: false,
    },
}, {timestamps: true});

User.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const hashedPassword = await hashTokens(this.password);
            this.password = hashedPassword;
            console.log('Hashed Password:', this.password); // Log to verify the hash
        } catch (err) {
            return next(err);
        }
    }
    next();
});

User.index({ createdAt: 1 }, {expireAfterSeconds: 86400});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);

