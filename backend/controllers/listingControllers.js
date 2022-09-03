const Listing = require("../models/listingModel");
const asyncHandler = require("express-async-handler");

// --PUBLIC
// GET Places By type
const getPlacesByType = asyncHandler(async (req, res) => {
  const places = await Listing.find({ type: req.params.type });
  res.json(places);
});

// --PUBLIC
// GET Single place

const getSinglePlace = asyncHandler(async (req, res) => {
  const place = await Listing.findById(req.params.id);
  if (place) {
    res.json(place);
  } else {
    res.status(404);
    throw new Error("Listing Not Found");
  }
});

// --PUBLIC
// GET OFFER LISTING

const getOfferListing = asyncHandler(async (req, res) => {
  const places = await Listing.find({ offer: true });
  if (places) {
    res.json(places);
  }
});

// --PUBLIC

const getFirstFiveListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find().limit(5);
  res.json(listings);
});

// --PRIVATE
// GET USERS LISTING

const getUserListing = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ user: req.user._id });
  res.json(listings);
});

// --PRIVATE
// DELETE LIsting
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404);
    throw new Error("No Listings");
  }
  await listing.remove();
});

// Create New Listing
// --PRIVATE

const createListing = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    offer,
    regularPrice,
    discountedPrice,
    location,
    geoLocation,
    images,
  } = req.body;
  const listing = await Listing.create({
    user: req.user._id,
    name,
    type,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    offer,
    regularPrice,
    discountedPrice,
    location,
    geoLocation,
    images,
  });

  res.status(201).json(listing);
});

module.exports = {
  createListing,
  getPlacesByType,
  getSinglePlace,
  getOfferListing,
  getUserListing,
  deleteListing,
  getFirstFiveListings,
};
