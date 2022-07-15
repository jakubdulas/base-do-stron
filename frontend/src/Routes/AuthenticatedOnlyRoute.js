import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthenticatedOnlyRoute = () => {
  let token = localStorage.getItem("token") ? true : false;
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticatedOnlyRoute;
