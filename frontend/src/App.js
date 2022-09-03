import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Categories from "./pages/Categories";
import ListingDetails from "./pages/ListingDetails";
import CreateListing from "./pages/CreateListing";
import UserListing from "./pages/UserListing";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/categories/:type" element={<Categories />} />
            <Route path="/categories/:type/:id" element={<ListingDetails />} />

            <Route path="/create-listing" element={<PrivateRoute />}>
              <Route path="/create-listing" element={<CreateListing />} />
            </Route>
            <Route path="/user-listing" element={<PrivateRoute />}>
              <Route path="/user-listing" element={<UserListing />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
