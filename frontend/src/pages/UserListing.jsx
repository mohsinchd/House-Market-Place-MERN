import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Listing from "../components/Listing";
import { getUsersListing } from "../actions/listingActions";
import { toast } from "react-toastify";

const UserListing = () => {
  const listingUser = useSelector((state) => state.listingUser);
  const { listings, loading, error } = listingUser;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersListing());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="container mt-3">
      <h1>User Listings</h1>
      {listings.length === 0 && <h5>No Listings Available</h5>}
      {listings.map((listing) => (
        <Listing key={listing._id} listing={listing} user={true} />
      ))}
    </div>
  );
};

export default UserListing;
