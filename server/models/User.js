const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { nameValidate, passwordValidate, usernameValidate } = require("./validate");

const User = new mongoose.Schema({    
    firstName: {
        type: String,
        unique: true,
        validate: {
            validator: nameValidate
        },
        require: [false],
        message: "Must enter a name that contains no numbers or special characters"
    },
    lastName: {
        type: String,
        unique: true,
        validate: {
            validator: nameValidate
        },
        require: [false],
        message: "Must enter a name that contains no numbers or special characters"
    },
    username: {
        type: String,
        required: [true, "must enter a username"],
        validate: {
            validator: usernameValidate
        },
        message: "Username must contain at 1 letter and 8 characters"
    },
    password: {
        type: String,
        required: [true, "Must enter a password"],
        validate: {
            validator: passwordValidate
        },
        message: "Password must contain at least eight characters and 1 capital and special characters"
    }, 
}, {timestamps: true});

User.index({ createdAt: 1 }, {expireAfterSeconds: 86400});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);

