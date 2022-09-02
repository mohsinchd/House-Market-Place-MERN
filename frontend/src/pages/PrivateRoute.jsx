import React from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../components/Loader";
const PrivateRoute = () => {
  const { isLoggedIn, checkingStatus } = useAuth();

  if (checkingStatus) {
    return <Loader />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
