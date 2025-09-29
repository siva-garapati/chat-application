const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ message: "No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log(decoded)

        if (!decoded) {
            res.status(401).json({ message: "Invalid Token" })
        }

        const user = await User.findById(decoded.id, {password:0})

        req.user=user

        // console.log(user)
        
        next();
    }
    catch (err) {
        console.log("Error in protectRoute middleware: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = protectRoute