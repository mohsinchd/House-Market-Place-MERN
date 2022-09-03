import React from "react";
import { MdBedroomParent } from "react-icons/md";
import { FaBath, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteListing } from "../actions/listingActions";

const Listing = ({ listing, user = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = (id) => {
    dispatch(deleteListing(id));
    toast.success("Deleted Successfully");
    navigate("/");
  };

  return (
    <div className="row align-items-center mb-3" key={listing._id}>
      <div className="col-4">
        <Link to={`/categories/${listing.type}/${listing._id}`}>
          <img
            src={listing.images[0]}
            alt="listingImg"
            className="img-fluid"
            style={{ borderRadius: 20 }}
          />
        </Link>
      </div>
      <div className="col-8">
        <p className="text-secondary m-0">{listing.location}</p>
        <h5>{listing.name}</h5>
        <h6 className="categoryPrice">
          {listing.type === "sale"
            ? `$${listing.regularPrice}`
            : `$${listing.regularPrice}/month`}
        </h6>
        <span>
          <MdBedroomParent size={20} /> {listing.bedrooms} Bedrooms
        </span>
        <span className="ms-3">
          <FaBath size={20} /> {listing.bathrooms} Bathrooms
        </span>
        <div className="mt-2">
          {user && (
            <button
              onClick={() => onDelete(listing._id)}
              className="btn btn-outline-danger ms-2"
            >
              <FaTrash /> Delete Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
