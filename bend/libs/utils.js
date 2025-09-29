const jwt = require('jsonwebtoken')

const setCookies = (userId, res) =>{
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        // sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return token
}

module.exports = setCookies