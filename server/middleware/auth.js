const { response } = require('express');
const SocialUser = require('../models/SocialUser');
const axios = require("axios");

async function FindOrCreate(profile){
    const user = {
        id: profile.id,
        displayName: profile.displayName,
        photo: profile.photos
    }
    console.log(user.id)
    try {
        if(!user.id)throw new Error("No user ID detected!");
        const existingUser = await SocialUser.findOne({id: user.id}).exec();
        console.log("This is the exisiting user", existingUser)
        if(!existingUser){
            console.log("User not found creating a new one");
            const newUser = await SocialUser.create(user);
            result = await newUser.save();
            console.log(result);
            return result
        } else {
            console.log("User found in database!")
            return existingUser
        }
    } catch (error) {
        console.error(error);
        throw error
    }
}

async function GetUsers(url, token) {
    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error obtaining the user:', error);
        throw new Error(`Error obtaining the user: ${error.message}`);
    }
}


module.exports = { FindOrCreate, GetUsers }