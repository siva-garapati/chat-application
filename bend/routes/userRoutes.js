const express = require("express");
const { register, login, checkAuth } = require("../controllers/userController");
const protectRoute = require("../libs/authMiddleware");
const router = express.Router();

router.post('/register', register)
router.post('/login', login)

router.get('/check', protectRoute, checkAuth)

module.exports = router