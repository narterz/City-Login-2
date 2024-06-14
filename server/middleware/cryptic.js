const crypto = require("crypto");

function generateState() {
    return crypto.randomBytes(20).toString("hex");
}

const hashTokens = (token) => {
    let shortenToken = token.trim().replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '');
    if(shortenToken.length >= 10){
        shortenToken = shortenToken.slice(0, 10);
    }
    return crypto.createHash("sha256").update(shortenToken).digest("hex")
}

module.exports = { hashTokens, generateState }