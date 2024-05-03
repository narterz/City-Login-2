const express = require("express");
const router = express.Router();

router.post('/googleLogin', (req, res) => {
    res.send("google login route is working!")
})

module.exports = router;