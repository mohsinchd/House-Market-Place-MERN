const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/:id").post(protect, updateProfile);

module.exports = router;
