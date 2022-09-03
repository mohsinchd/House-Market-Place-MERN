import React, { useEffect } from "react";
import { getListingDetails } from "../actions/listingActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Loader from "../components/Loader";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const ListingDetails = () => {
  const { type, id } = useParams();
  const dispatch = useDispatch();

  const listingDetails = useSelector((state) => state.listingDetails);
  const { listing, loading } = listingDetails;

  useEffect(() => {
    dispatch(getListingDetails(type, id));
  }, [type, id, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.images.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.images[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="swiperSlideDiv"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container mt-5 listingDetails">
        <h4>
          {listing.name} - ${listing.regularPrice}
        </h4>
        <h6>{listing.location}</h6>
        <div>
          <span class="badge bg-mine">For {listing.type}</span>
          <span class="badge bg-dark ms-3">
            ${listing.offer && listing.regularPrice - listing.discountedPrice}{" "}
            Discount
          </span>
          {listing.offer && (
            <span class="badge bg-secondary ms-3">
              After discount price will be ${listing.discountedPrice}
            </span>
          )}
        </div>
        <p className=" text-secondary m-0">{listing.bedrooms} Bedrooms</p>
        <p className=" text-secondary  m-0">{listing.bathrooms} Bathrooms</p>
        <p className=" text-secondary  m-0">
          {listing.parking ? "Parking Spot" : "No Parking Spot"}
        </p>
        <p className=" text-secondary  m-0">
          {listing.furnished ? "Furnished" : "Not Furnished"}
        </p>
        <div className="mt-3">
          <h4>Location</h4>
          <div className="leafletContainer">
            <MapContainer
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                zIndex: "10",
              }}
              center={[listing.geoLocation.lat, listing.geoLocation.lng]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
              />
              <Marker
                position={[listing.geoLocation.lat, listing.geoLocation.lng]}
              >
                <Popup>{listing.location}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
