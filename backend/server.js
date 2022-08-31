const express = require("express");
const dotenv = require("dotenv");
const app = express();

// ConfigDotenv
dotenv.config();

// PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port=${PORT}`);
});
