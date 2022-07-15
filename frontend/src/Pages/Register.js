import React from "react";

export default function Register() {
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  const submitForm = (e) => {
    e.preventDefault();

    const { email, username, password, password2 } = formData;

    if (email && username && password === password2 && password) {
      console.log("register");
    } else if (!email) {
      setErrorMessage("Email cant be empty");
    } else if (!password) {
      setErrorMessage("Password cant be empty");
    } else if (!username) {
      setErrorMessage("Username cant be empty");
    } else if (password !== password2) {
      setErrorMessage("Passwords must match");
    }
  };

  React.useEffect(() => {
    setErrorMessage("");
  }, [formData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Register</h1>
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
      <form onSubmit={submitForm}>
        <div>
          {/* e-mail div */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label>e-mail</label>
            {/* e-mail input */}
            <input
              style={{ width: "200px" }}
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((currState) => ({
                  ...currState,
                  email: e.target.value,
                }))
              }
            />
          </div>
          {/* username div */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label>username</label>
            {/* username input */}
            <input
              style={{ width: "200px" }}
              name="username"
              type="name"
              value={formData.username}
              onChange={(e) =>
                setFormData((currState) => ({
                  ...currState,
                  username: e.target.value,
                }))
              }
            />
          </div>

          {/*  password div */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label>password</label>
            {/* passowrd input */}
            <input
              style={{ width: "200px" }}
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((currState) => ({
                  ...currState,
                  password: e.target.value,
                }))
              }
            />
          </div>
          {/* repeat passowrd div */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label>repeat password</label>
            {/* repeat passowrd input */}
            <input
              style={{ width: "200px" }}
              name="password2"
              type="password"
              value={formData.password2}
              onChange={(e) =>
                setFormData((currState) => ({
                  ...currState,
                  password2: e.target.value,
                }))
              }
            />
          </div>

          {/* submit button  */}
          <input
            style={{
              width: "200px",
              marginTop: "10px",
            }}
            name="submit"
            type="submit"
            value="Zarejestruj się"
          />
        </div>
      </form>
    </div>
  );
}
