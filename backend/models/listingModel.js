const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    type: {
      type: String,
      required: [true, "Type is Required"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Number of Bedrooms are Required"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Number of Bathrooms are required"],
    },
    parking: {
      type: Boolean,
      default: false,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: Boolean,
      default: false,
    },
    regularPrice: {
      type: Number,
      required: [true, "Price is Required"],
    },
    discountedPrice: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      required: [true, "Location is Required"],
    },
    geoLocation: {
      lat: { type: String },
      lng: { type: String },
    },
    images: [String],
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
