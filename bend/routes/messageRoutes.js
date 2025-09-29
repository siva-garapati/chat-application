const express = require("express");
const protectRoute = require("../libs/authMiddleware");
const { getUsers, sendMessages, getMessages } = require("../controllers/messageController");
const router = express.Router();

router.get('/users', protectRoute, getUsers)
router.post('/send', protectRoute, sendMessages)
router.get('/get/:id', protectRoute, getMessages)

module.exports = router