import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/api/signup",
        {
          username,
          password,
        }
      );

      console.log("SIGNUP RESPONSE:", res.data);

      alert(
        "Signup successful! Your ID: " + res.data.userId
      );

      // Optional: clear inputs after successful signup
      setUsername("");
      setPassword("");

    } catch (err) {
      console.log("SIGNUP ERROR:", err);

      if (err.response) {
        console.log("STATUS:", err.response.status);
        console.log("DATA:", err.response.data);

        alert(
          "Signup failed: " +
          (err.response.data.message || "Unknown error")
        );

      } else if (err.request) {
        console.log("NO RESPONSE FROM SERVER");

        alert(
          "Signup failed: Cannot connect to server. " +
          "Make sure your backend is running on port 3001."
        );

      } else {
        alert("Signup failed: " + err.message);
      }
    }
  };

  return (
    <div className="ngilo-user">
      <div className="user-login">
        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <label>Username</label>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Sign Up
          </button>
        </form>

        <Link to="/login">
          Go Back to Log In
        </Link>
      </div>
    </div>
  );
};

export default Register;