import React, { useState } from "react";
import "../CSS/Register.css"; // reuse same styling if needed

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // REGEX patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/; // min 6 chars, letter + number

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!emailRegex.test(formData.email)) {
      setMessage("Invalid email format");
      setIsError(true);
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      setMessage(
        "Password must be at least 6 characters and include letters and numbers"
      );
      setIsError(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(result.message || "Login successful");
        setIsError(false);
        setFormData({ email: "", password: "" });
      } else {
        setMessage(result.message || "Login failed");
        setIsError(true);
      }
    } catch (error) {
      setMessage("Server is not responding");
      setIsError(true);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Login</h2>
        <p className="subtitle">Welcome back! Please login to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
          <button type="reset" onClick={() => setFormData({ email: "", password: "" })}>
            Reset
          </button>
        </form>

        {message && (
          <p className={isError ? "error" : "success"}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;