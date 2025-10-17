const bcrypt = require("bcrypt");
const User = require("../models/User");
const setCookies = require("../libs/utils");

let register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        if (newUser) {
            setCookies(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (err) {
        console.log("Error in signup controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

let login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        setCookies(user._id, res)

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    }
    catch (err) {
        console.log("Error in login controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const checkAuth = (req, res) => {
    try {
        const user = req.user
        console.log(user)
        res.status(200).json(user);
    }
    catch (err) {
        console.log("Error in checkAuth controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const searchUsers = async (req, res) => {
    try {
        const query = req.query.query;

        if (!query) return res.json([]);

        const users = await User.find({
            username: { $regex: query, $options: 'i' }
        }).select('-password');

        res.json(users)
    }
    catch (err) {
        console.log("Error in searchUsers controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        console.log("Error in checkAuth controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { register, login, checkAuth, logout, searchUsers }