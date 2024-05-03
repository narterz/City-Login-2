const express = require("express");
const router = express.Router();

router.post('/facebookLogin', (req, res) => {
    res.send("facebook route is working!")
})

module.exports = router;