import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export default function Login() {
  let { loginUser, errorMessage } = useContext(AuthContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Login</h1>
      {errorMessage && (
        <div
          style={{
            border: "1px solid red",
            borderRadius: "10px",
            backgroundColor: "#ff000020",
            width: "200px",
            padding: "10px",
          }}
        >
          <span style={{ color: "red" }}>{errorMessage}</span>
        </div>
      )}
      <form onSubmit={loginUser}>
        <div>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label>e-mail</label>
            <input style={{ width: "200px" }} name="username" type="name" />
          </div>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label>password</label>
            <input style={{ width: "200px" }} name="password" type="password" />
          </div>

          <input
            style={{
              width: "200px",
              marginTop: "10px",
            }}
            name="submit"
            type="submit"
            value="Zaloguj się"
          />
        </div>
      </form>
    </div>
  );
}
