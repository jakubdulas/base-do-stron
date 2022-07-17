import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const AuthenticatedOnlyRoute = () => {
  let { user } = useContext(AuthContext);
  const pathname = window.location.pathname;
  let param = "";
  if (pathname) {
    param += `?next=${pathname}`;
  }

  let authenticated = Boolean(user);
  return authenticated ? <Outlet /> : <Navigate to={`/login${param}`} />;
};

export default AuthenticatedOnlyRoute;
