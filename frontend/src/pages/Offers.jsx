import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffer } from "../actions/listingActions";
import Listing from "../components/Listing";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
const Offers = () => {
  const dispatch = useDispatch();
  const listingOffer = useSelector((state) => state.listingOffer);
  const { listings, loading, error } = listingOffer;
  useEffect(() => {
    dispatch(getOffer());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="container mt-3">
      <h1>Offers</h1>
      {listings.length === 0 && <h5>No Offers Available</h5>}
      <div className="mt-3">
        {listings.map((listing) => (
          <Listing key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default Offers;
