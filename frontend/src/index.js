import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AuthenticatedOnlyRoute from "./Routes/AuthenticatedOnlyRoute";
import Login from "./Pages/Login";
import Welcome from "./Pages/Welcome";
import Register from "./Pages/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<AuthenticatedOnlyRoute />}>
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
