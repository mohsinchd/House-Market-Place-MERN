const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  res.send("Route is working");
});

module.exports = {
  registerUser,
};
