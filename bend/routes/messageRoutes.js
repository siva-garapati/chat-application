const express = require("express");
const protectRoute = require("../libs/authMiddleware");
const {sendMessages, getMessages, getChattedUsers } = require("../controllers/messageController");
const router = express.Router();

router.get('/users', protectRoute, getChattedUsers)
router.post('/send', protectRoute, sendMessages)
router.get('/get/:id', protectRoute, getMessages)

module.exports = router