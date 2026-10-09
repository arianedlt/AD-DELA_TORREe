import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://localhost:3001/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN STATUS:", response.status);
      console.log("LOGIN RESPONSE:", data);

      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        navigate("/home");
      } else {
        setError(
          data.message ||
          "Invalid username or password."
        );
      }

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setError(
        "Cannot connect to backend on port 3001."
      );
    }
  };

  return (
    <div className="ngilo-user">
      <div className="user-login">
        <h2>Log In</h2>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Log In
          </button>
        </form>

        <Link to="/register">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;