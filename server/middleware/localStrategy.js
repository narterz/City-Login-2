const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/User");
const passport = require("passport");
const { hashTokens } = require("./cryptic");

passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            const query = await User.findOne({ username: username, }).exec();
            if (query && hashTokens(password) === query.password) {
                done(null, query)
            } else {
                done(null)
            }
        } catch (error) {
            throw error
        }
    }
));

module.exports = passport;