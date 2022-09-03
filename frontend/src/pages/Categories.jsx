import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListingByCategory } from "../actions/listingActions";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import Listing from "../components/Listing";

const Categories = () => {
  const { type } = useParams();
  const dispatch = useDispatch();

  const listingCategory = useSelector((state) => state.listingCategory);
  const { listings, error, loading } = listingCategory;

  useEffect(() => {
    dispatch(getListingByCategory(type));
    if (error) {
      toast.error(error);
    }
  }, [dispatch, type, error]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container mt-3">
      <h1>Places for {type}</h1>
      {listings.length === 0 && <h5>No Listings Available</h5>}
      <div className="mt-3">
        {listings.map((listing) => (
          <Listing key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
