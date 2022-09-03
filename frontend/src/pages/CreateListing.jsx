import React, { useState } from "react";
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Loader from "../components/Loader";
import { createNewListing } from "../actions/listingActions";
import { useDispatch } from "react-redux";

const CreateListing = () => {
  const [type, setType] = useState("Rent");
  const [name, setName] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [address, setAddress] = useState("");
  const [offer, setOffer] = useState(false);
  const [regularPrice, setRegularPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const apiKey = "17fe922104e0045355fdd3d7a5bf36c3";

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // GET GEOLocation
    const { data } = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${address}`
    );
    const geolocation = {};
    const { longitude, latitude } = data.data[0];
    geolocation.lat = String(latitude);
    geolocation.lng = String(longitude);
    // Save Images to Firebase

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const fileName = `${image.name}-${v4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      return;
    });

    const listingData = {
      type: type.toLowerCase(),
      name,
      bedrooms,
      bathrooms,
      parking,
      furnished,
      location: address,
      geoLocation: geolocation,
      offer,
      regularPrice,
      discountedPrice,
      images: imgUrls,
    };
    console.log(listingData);

    dispatch(createNewListing(listingData));

    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-3 create-listing">
      <div className="mx-start mx-md-auto w-100 w-md-50">
        <h1>Create a Listing</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="type">Rent/Sale</label>
            <select
              className="form-select"
              onChange={(e) => setType(e.target.value)}
              aria-label="Default select example"
            >
              <option>rent</option>
              <option>sale</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="type">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="bedrooms">Bedrooms</label>
              <input
                type="number"
                className="form-control"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="bedrooms">Bathrooms</label>
              <input
                type="number"
                className="form-control"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="parking">Parking Spot</label>
            <select
              class="form-select"
              onChange={(e) => setParking(!parking)}
              aria-label="Default select example"
            >
              <option>Yes</option>
              <option selected>No</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="furnished">Furnished</label>
            <select
              class="form-select"
              onChange={(e) => setFurnished(!furnished)}
              aria-label="Default select example"
            >
              <option>Yes</option>
              <option selected>No</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="offer">Offer</label>
            <select
              class="form-select"
              onChange={(e) => setOffer(!offer)}
              aria-label="Default select example"
            >
              <option>Yes</option>
              <option selected>No</option>
            </select>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="RegularPrice">Regular Price</label>
              <input
                type="number"
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
                className="form-control"
              />
            </div>
            {offer && (
              <div className="col">
                <label htmlFor="DiscountedPrice">Discounted Price</label>
                <input
                  type="number"
                  value={discountedPrice}
                  onChange={(e) => setDiscountedPrice(e.target.value)}
                  className="form-control"
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label for="formFileMultiple" class="form-label">
              Select Images
            </label>
            <input
              class="form-control"
              type="file"
              id="formFileMultiple"
              onChange={(e) => setImages(e.target.files)}
              multiple
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            style={{ padding: "20px" }}
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
