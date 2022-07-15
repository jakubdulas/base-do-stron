import React from "react";

export default function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  const submitForm = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (email && password) {
      console.log("login");
    } else if (!email) {
      setErrorMessage("Email cant be empty");
    } else if (!password) {
      setErrorMessage("Password cant be empty");
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
      <form onSubmit={submitForm}>
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
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label>password</label>
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
