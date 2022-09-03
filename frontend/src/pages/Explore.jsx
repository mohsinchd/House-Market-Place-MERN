import React from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import house1 from "../imgs/house-images/exterior_1.jpeg";
import house2 from "../imgs/house-images/exterior_2.jpeg";
const Explore = () => {
  return (
    <div className="container mt-3 ">
      <h1>Explore</h1>
      <Slider />
      <div className="row">
        <h5>Categories</h5>
        <div className="col-md-6">
          <Link to="/categories/rent">
            <img
              src={house1}
              width="100%"
              className="categoryImg"
              alt="house1"
            />
          </Link>
          <p className="lead">Places for Rent</p>
        </div>
        <div className="col-md-6">
          <Link to="/categories/sale">
            <img
              src={house2}
              width="100%"
              className="categoryImg"
              alt="house2"
            />
          </Link>
          <p className="lead">Places for Sale</p>
        </div>
      </div>
    </div>
  );
};

export default Explore;
