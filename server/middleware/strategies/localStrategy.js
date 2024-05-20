const LocalStrategy = require('passport-local').Strategy;
const User = require("../../models/User");
const passport = require("passport");

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
            if (!user.verifyPassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
            return done(null, user);
        });
    }
));

module.exports = passport;