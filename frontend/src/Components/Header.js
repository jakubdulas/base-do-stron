import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

function Header() {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <>
      <div>
        {user ? (
          <>
            <span>Hello, {user?.username}</span>{" "}
            <span onClick={logoutUser}>Logout</span>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </>
  );
}

export default Header;
