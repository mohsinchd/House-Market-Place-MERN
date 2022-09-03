import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Loader from "./Loader";
import { getExploreListing } from "../actions/listingActions";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Slider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listingExplore = useSelector((state) => state.listingExplore);
  const { listings, loading } = listingExplore;

  console.log(listings);
  useEffect(() => {
    dispatch(getExploreListing());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    listings && (
      <>
        <h5>Recomended</h5>
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map((listing) => (
            <SwiperSlide
              key={listing._id}
              onClick={() =>
                navigate(`/categories/${listing.type}/${listing._id}`)
              }
            >
              <div
                style={{
                  background: `url(${listing.images[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="swiperSlideDiv"
              >
                <p className="swiperSlideText">{listing.name}</p>
                <p className="swiperSlidePrice">
                  ${listing.discountedPrice ?? listing.regularPrice}{" "}
                  {listing.type === "rent" && "/ month"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};

export default Slider;
