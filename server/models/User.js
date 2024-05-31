const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { hashCreds } = require('../middleware/cryptic');

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
    if ((this.isModified('password') || this.isNew) && this.hashPassword) {
        const hashedPassword = await hashCreds(this.password);
        this.password = hashedPassword;
    }
    next();
});
User.index({ createdAt: 1 }, {expireAfterSeconds: 86400});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);

