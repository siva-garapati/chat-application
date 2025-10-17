const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const dotenv = require('dotenv')
const authRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const connectDB = require("./libs/db");
const { app, server } = require("./libs/socket");

dotenv.config();

const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});