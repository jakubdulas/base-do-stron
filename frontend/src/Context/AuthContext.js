import React, { createContext, useState, useEffect } from "react";
import { base_url } from "../settings";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [errorMessage, setErrorMessage] = useState("");
  let [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  // funkcja logujaca
  let loginUser = async (e) => {
    e.preventDefault();

    let username = e.target?.username?.value;
    let password = e.target?.password?.value;

    if (username && password) {
      // wyslij dane do serwera
      let response = await fetch(`${base_url}/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      let data = await response.json();

      // jezeli email i haslo sie zgadzaja
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));

        const next = queryParams.get("next");

        // przekieruj na odpowiednia strone
        if (next) {
          navigate(next);
        } else {
          navigate("/home");
        }
      } else if (!username) {
        setErrorMessage("Email cant be empty");
      } else if (!password) {
        setErrorMessage("Password cant be empty");
      }
    } else {
      alert("Something went wrong");
    }
  };

  // wyloguj uzytkownika
  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // uaktualnij token
  let updateToken = async () => {
    console.log("update token");

    // wyslij dane do serwera
    let response = await fetch(`${base_url}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  let context = {
    loginUser: loginUser,
    errorMessage: errorMessage,
    user: user,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={context}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
