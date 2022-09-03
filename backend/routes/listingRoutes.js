const express = require("express");
const {
  createListing,
  getPlacesByType,
  getSinglePlace,
  getOfferListing,
  getUserListing,
  deleteListing,
  getFirstFiveListings,
} = require("../controllers/listingControllers");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/new").post(protect, createListing);
router.route("/places/:type").get(getPlacesByType);
router.route("/places/single/:type/:id").get(getSinglePlace);
router.route("/").get(getOfferListing);
router.route("/userlisting").get(protect, getUserListing);
router.route("/:id").delete(protect, deleteListing);
router.route("/all").get(getFirstFiveListings);

module.exports = router;
