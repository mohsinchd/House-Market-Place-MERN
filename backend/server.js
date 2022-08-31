const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
// ConfigDotenv
dotenv.config();

// Connect DB
connectDB();

// PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port=${PORT}`);
});
