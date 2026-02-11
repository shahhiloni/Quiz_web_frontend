import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 for redirect
import "../CSS/Register.css";

const Register = () => {
  const navigate = useNavigate(); // 🔹 navigation hook

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({});

  // regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^[0-9]{10}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Validation
  const validateForm = () => {
    let newErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!contactRegex.test(formData.contact)) {
      newErrors.contact = "Contact must be exactly 10 digits";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ chars with uppercase, lowercase, number & special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        // ✅ New user registered → go to HOME
        setMessage("Registration successful!");
        setIsError(false);

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        // ❌ Already registered → go to LOGIN
        if (result.message?.toLowerCase().includes("already")) {
          setMessage("User already registered. Redirecting to login...");
          setIsError(true);

          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          setMessage(result.message || "Registration Failed");
          setIsError(true);
        }
      }
    } catch (error) {
      setMessage("Server is not responding");
      setIsError(true);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join us and start your journey</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Enter Strong Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          {formData.password && !passwordRegex.test(formData.password) && (
            <p className="hint">
              Use 8+ characters with A-Z, a-z, 0-9 & special symbol.
            </p>
          )}

          <input
            type="tel"
            name="contact"
            placeholder="Enter 10-digit Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          {errors.contact && <p className="error">{errors.contact}</p>}

          <button type="submit">Register</button>
        </form>

        {message && <p className={isError ? "error" : "success"}>{message}</p>}

        {/* 🔹 Already have account → Login */}
        <p className="login-link">
          Already registered?{" "}
          <span onClick={() => navigate("/login")}>Go to Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
