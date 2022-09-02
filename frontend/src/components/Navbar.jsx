import React from "react";
import { MdOutlineExplore, MdOutlineLocalOffer } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar navbar-light bg-light">
      <div className="container">
        <ul className="d-flex p-0 justify-content-between navbarList">
          <li className="nav-item">
            <Link to="/" className="navbarLink">
              <MdOutlineExplore />
            </Link>
            <p className="lead m-0">Explore</p>
          </li>
          <li className="nav-item">
            <Link to="/offers" className="navbarLink">
              <MdOutlineLocalOffer />
            </Link>
            <p className="lead m-0">Offers</p>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="navbarLink">
              <FaUser />
            </Link>
            <p className="lead m-0">Profile</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
