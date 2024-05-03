const express = require("express");
const router = express.Router();

router.post('/githubLogin', (req, res) => {
    res.send("github login route is working!")
})

module.exports = router;