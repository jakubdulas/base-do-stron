import React, { createContext, useState, useEffect } from "react";
import { base_url } from "../utils/settings";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  try {
    jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access);
  } catch (er) {
    localStorage.clear();
  }
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

    let email = e.target?.email?.value;
    let password = e.target?.password?.value;

    if (email && password) {
      // wyslij dane do serwera
      let response = await fetch(`${base_url}/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
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
      } else if (!email) {
        setErrorMessage("Email cant be empty");
      } else if (!password) {
        setErrorMessage("Password cant be empty");
      }
    } else {
      alert("Something went wrong");
    }
  };

  // zarejestruj uzytkownika
  let registerUser = async (e) => {
    e.preventDefault();

    let email = e.target?.email?.value;
    let username = e.target?.username?.value;
    let password = e.target?.password?.value;
    let password2 = e.target?.password2?.value;

    if (!email) {
      setErrorMessage("Email cant be empty");
    } else if (!username) {
      setErrorMessage("Password cant be empty");
    } else if (!password) {
      setErrorMessage("Password cant be empty");
    } else if (password !== password2) {
      setErrorMessage("Passwords must match");
    }

    if (email && password && password2 && username && password2 === password) {
      // wyslij dane do serwera
      let response = await fetch(`${base_url}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          password2: password2,
        }),
      });

      // jezeli rejestracja przebiegła pomyślnie
      if (response.status === 201) {
        navigate("/login");
      }
    } else {
      alert("Something went wrong");
    }
  };

  // wyloguj uzytkownika
  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  let context = {
    loginUser: loginUser,
    logoutUser: logoutUser,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    registerUser: registerUser,
    setErrorMessage: setErrorMessage,
    authTokens: authTokens,
    errorMessage: errorMessage,
    user: user,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={context}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
