const express = require("express");
const router = express.Router();

router.post('/whatsAppLogin', (req, res) => {
    res.send("WhatsApp route is working!")
})

module.exports = router;