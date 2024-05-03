const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const specialCharsTest = (value) => {
    const chars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
    const ints = /[0-9]/;
    return chars.test(value) && chars.test(ints);
};

const capitalCharTest = (value) => {
    return /[A-Z]/.test(value)
}

const passwordValidate = (value) => {
    if(value.length >= 8){
        return specialCharsTest && capitalCharTest 
    } else {
        return false
    }
}

const usernameValidate = (value) => {
    return value.length >= 8 && /[a-zA-Z]/.test(value);
}

const nameValidate = (value) => {
    return /[0-9]/.test(value) && value;
}

const User = new mongoose.Schema({    
    firstName: {
        type: String,
        validate: {
            validator: nameValidate
        },
        require: [false],
        message: "Must enter a name that contains no numbers or special characters"
    },
    lastName: {
        type: String,
        validate: {
            validator: nameValidate
        },
        require: [false],
        message: "Must enter a name that contains no numbers or special characters"
    },
    username: {
        type: String,
        required: [true],
        validate: {
            validator: usernameValidate
        },
        message: "Username must contain at 1 letter and 8 characters"
    },
    password: {
        type: String,
        required: [true],
        validate: {
            validator: passwordValidate
        },
        message: "Password must contain at least eight characters and 1 capital and special characters"
    }
}, {timestamps: true});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);

