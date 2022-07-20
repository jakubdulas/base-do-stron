import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const GuestRoute = () => {
  let { user } = useContext(AuthContext);
  const pathname = window.location.pathname;

  let notAuthenticated = !Boolean(user);
  return notAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};

export default GuestRoute;
