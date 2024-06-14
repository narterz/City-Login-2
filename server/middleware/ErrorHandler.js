const { URLSearchParams } = require('url');
const { CLIENT_FAILURE } = process.env

const ErrorHandler = (err, req, res, next) => {
    console.error("An error has occurred");
    const code = err.code || 500;
    const message = err.message || "Something went wrong";
    const error = err.error || {};
    const errorParams = new URLSearchParams({
        code: code,
        error: JSON.stringify(error),
        message: message
    }).toString();
    res.redirect(`${CLIENT_FAILURE}?${errorParams}`)
}

module.exports = { ErrorHandler }