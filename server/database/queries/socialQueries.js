const SocialUser = require('../../models/SocialUser');
const axios = require("axios");
const { hashTokens } = require('../../middleware/cryptic');
const { URLSearchParams } = require('url');

//1: Search in database for token
async function FindToken(token) {
    try {
        const accessToken = hashTokens(token)
        const existingUser = await SocialUser.findOne({ accessToken: accessToken }).exec();
        if(existingUser){
            const { displayName, id, photo } = existingUser;
            return {
                displayName: displayName,
                id: id,
                photo: photo
            };
        } else {
            console.log("User was not found")
            return false;
        }
    } catch(error){
        throw {
            message: "There was an error processing your social media account",
            code: 500,
            error: error
        };
    }
}


//2: Fetch user data from api if token not in database
async function FetchSocialData(url, token) {
    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error obtaining the user: ${error.message}`);
    }
}

//3: Create user in database and return needed data for the frontend
async function CreateSocialUser(profile){
    try {
        const existingUser = await SocialUser.findOne({id: profile.id}).exec();
        if(existingUser){
            return existingUser;
        }
        const newUser = await SocialUser.create(profile);
        const result = await newUser.save();
        const user = {
            displayName: result.displayName,
            id: result.id,
            photo: result.photo
        }
        console.log(user)
        return user
    } catch(error){
        const errorParams = new URLSearchParams({
            message: "There was an error creating your account please try again",
            code: 500,
            error: error
        }).toString();
        throw new Error(errorParams)
    }
}

module.exports = { CreateSocialUser, FindToken, FetchSocialData }

