const crypto = require("crypto");
const bcrypt = require('bcrypt');

const sessionSecret = crypto.randomBytes(32).toString("hex");

function generateState() {
    return crypto.randomBytes(20).toString("hex");
}

const hashCreds = async (password) => {
    if (!password) {
        throw new Error('Password is required');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

async function isMatch(value) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(value, salt)
    const match = await bcrypt.compare(value, hash);
    return match
}

module.exports = { sessionSecret, hashCreds, isMatch, generateState }