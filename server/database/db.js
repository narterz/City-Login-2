const mongoose = require("mongoose");
require('dotenv').config({ path: '../.env' });

const mongooseUri = process.env.MONGOOSE_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(
    mongooseUri,
    options
)
.then(() => {
    console.log("Connected to mongoose")
})
.catch((error) => {
    console.log("Error connecting to mongoose", error)
})


const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once('open', () => {
    console.log("Connected to MongoDB")
});

module.exports = db;
