const mongoose = require("mongoose");
require('dotenv').config({ path: '../.env' });

const mongooseUri = process.env.MONGOOSE_URI;

mongoose.connect(mongooseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection();

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once('open', () => {
    console.log("Connected to MongoDB")
});

module.exports = db;
