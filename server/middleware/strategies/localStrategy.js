const LocalStrategy = require('passport-local').Strategy;
const User = require("../../models/User");
const passport = require("passport");
const { isMatch } = require("../cryptic");

passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            if(!username)throw new Error("Must enter a username");
            if(!password)throw new Error("Must enter a password")
            const query = await User.findOne({ username: username, }).exec();
            console.log(query)
            if (!query) { throw new Error("User not found") }
            if (!isMatch(query.password)) {
                throw new Error("Password does not match! Please try again")
            }
            done(null, query)
        } catch (error) {
            done(error)
        }
    }
));

module.exports = passport;