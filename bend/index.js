const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv')
const router = require("./routes/userRoutes");
const connectDB = require("./libs/db");
require("dotenv").config();

dotenv.config()

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', router)

app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});