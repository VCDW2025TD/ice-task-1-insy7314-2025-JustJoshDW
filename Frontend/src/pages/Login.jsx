import React, { useState } from "react";
import api from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isStrongPassword } from "../utils/validators";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (!isStrongPassword(password)) {
      setError("Password must be at least 8 characters and include letters and numbers.");
      return;
    }

    try {
      const response = await axios.post("https://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save token to local storage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard (or wherever you want)
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
