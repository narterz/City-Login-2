const User = require("../../models/User");
const { hashTokens } = require('../../middleware/cryptic')

async function QueryLocalUser(user) {
    console.log("Query user ran")
    try {
        const existingUser = await User.findOne({ username: user.username }).exec();
        console.log("Does this user exist", !existingUser)
        if (!existingUser) {
            console.log("user does not exist creating a new one");
            const newUser = await User.create(user)
            result = await newUser.save();
            return user
        } else {
            throw {
                code: 401,
                message: `The user ${user.username} already exists please sign in`,
                error: ""
            }
        }
    } catch (error) {
        if(error.code){
            throw error
        } else {
            throw {
                code: 500,
                message: "Internal server error please try again",
                error: error
            }
        }
    }
}

async function ChangeAccount(user) {
    try {
        const updatedAccount = await User.findOneAndUpdate(
            { username: user.username },
            { password: hashTokens(user.password) },
            { new: true }
        );
        console.log("4: This is the new updated account", updatedAccount)
        if (!updatedAccount) {
            throw {
                code: 401,
                message: `Account ${user.username} not found`,
                error: ""
            };
        }
        return "Password successfully changed";
    } catch (error) {
        if (error.code) {
            throw error;
        } else {
            console.error(error)
            throw {
                code: 500,
                message: "Internal server error please try again",
                error: error
            };
        }
    }
}


module.exports = { QueryLocalUser, ChangeAccount }