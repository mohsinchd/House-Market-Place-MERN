const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken");
const User = require("../models/userModel");

// --PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Find if User Already Exists
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  // Create New User
  const newUser = await User.create({
    name,
    email,
    password,
  });
  // Return User with JsonWebToken
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Bad User Data");
  }
});

// --PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Find if User Exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Bad User Credentials! Email or Password is Wrong");
  }
  // Compare User Password
  const matchPassword = await user.checkPassword(password);

  if (!matchPassword) {
    res.status(400);
    throw new Error("Bad User Credentials! Email or Password is Wrong");
  }

  // Return User with JsonWebToken

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

// --PRIVATE

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// -- PRIVATE

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Find the User
  let user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  user.name = name || user.name;
  user.email = email || user.email;

  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    token: generateToken(updatedUser._id),
  });
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
};
