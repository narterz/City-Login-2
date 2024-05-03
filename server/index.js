const express = require("express");
const cors = require("cors");
const passport = require("passport");
const local = require('./routes/manualLogin');
const facebookRoute = require('./routes/facebookRoute');
const whatsAppRoute = require('./routes/whatsAppRoute');
const githubRoute = require('./routes/githubRoute');
const googleRoute = require('./routes/googleRoute');
const crypto = require("crypto");
const bodyParser = require("body-parser");
const session = require("express-session");
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(cors());
const port = 3000;
const sessionSecret = crypto.randomBytes(32).toString("hex");

app.use(session("express-session")({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120000,
        httpOnly: true,
        secure: true
    }
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(express.json());
app.use(bodyParser).urlencoded({ extended: true })

app.use('/', local);
app.use('/', googleRoute);
app.use('/', facebookRoute);
app.use('/', whatsAppRoute);
app.use('/', githubRoute);

const User = require("./models/User");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }), function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        }
    }
));

let _ = {};

_.start = () => {
    try {
        app.listen(port)
        console.log(`Express server listening on port ${port}`)
    } catch (err) {
        throw new Error(err)
    }
}

_.start();



