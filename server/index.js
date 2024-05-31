require('dotenv').config({ path: '.env' });

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const crypto = require("crypto");
const MongoStore = require("connect-mongo");

require("./database/db");
require("./middleware/strategies/localStrategy");

const local = require('./routes/manualLogin');
const facebookRoute = require('./routes/facebookRoute');
const githubRoute = require('./routes/githubRoute');
const googleRoute = require('./routes/googleRoute');
const linkedinRoute = require('./routes/linkedInRoute');

const app = express();
const port = process.env.PORT || 4000;
const sessionSecret = crypto.randomBytes(32).toString("hex");

app.use(cors());
app.use(express.json());

const mongooseUri = process.env.MONGOOSE_URI;

//change cookies later
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongooseUri }),
    cookie: {
        maxAge: 120000,
        httpOnly: true,
        secure: false
    }
}));

app.use(passport.session());
app.use(passport.initialize());

const User = require('./models/User');
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', local);
app.use('/', googleRoute);
app.use('/', facebookRoute);
app.use('/', githubRoute);
app.use("/", linkedinRoute);

let _ = {};

_.start = () => {
    try {
        app.listen(port)
        console.log(`Express server listening on port ${port}`)
    } catch (err) {
        throw new Error(err)
    }
};

_.start();



