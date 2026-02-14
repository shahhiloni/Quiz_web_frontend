import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/Register.css";

const Login = () => {
  const navigate = useNavigate(); // naviagation used for redirect

  // form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // success / error message
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // validation error object
  const [error, setError] = useState({});

  // REGEX
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*])(?=.*[0-9]).{8,}$/;

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // validation function
  const validationForm = () => {
    let newError = {};

    if (!emailRegex.test(formData.email)) {
      newError.email = "Enter a valid email address";
    }

    if (!passwordRegex.test(formData.password)) {
      newError.password =
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  // submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validationForm()) return;

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

        // store token if exists
        if (result.token) {
          localStorage.setItem("token", result.token);
        }

        // clear form
        setFormData({ email: "", password: "" });

        // redirect to home page after 1 second (1000ms = 1s)
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(result.message || "Login failed");
        setIsError(true);
      }
    } catch (err) {
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
            type="text"
            name="email"
            placeholder="Enter Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {error.email && <p className="error">{error.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error.password && <p className="error">{error.password}</p>}

          <button type="submit">Login</button>
          <button
            type="reset"
            onClick={() => setFormData({ email: "", password: "" })}
          >
            Reset
          </button>
        </form>

        {message && <p className={isError ? "error" : "success"}>{message}</p>}

        <p className="subtitle" style={{ marginTop: "10px" }}>
          Don’t have an account?
          <Link to="/register" style={{ color: "#007bff", fontWeight: "bold" }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
