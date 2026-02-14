import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/Register.css";

const Register = () => {
  const navigate = useNavigate(); // for redirect

  // initial fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  // for success message
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // for input validation error
  const [error, setError] = useState({});

  // REGEX
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^[0-9]{10}$/; // fixed (exact 10 digits)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*])(?=.*[0-9]).{8,}$/;

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // validation
  const validationForm = () => {
    let newError = {};

    if (formData.name.trim().length < 2) {
      newError.name = "Name must be at least 2 characters";
    }

    if (!emailRegex.test(formData.email)) {
      newError.email = "Enter a valid email address";
    }

    if (!contactRegex.test(formData.contact)) {
      newError.contact = "Contact must be exactly 10 digits";
    }

    if (!passwordRegex.test(formData.password)) {
      newError.password =
        "Password must be 8+ chars with uppercase, lowercase, number & special character";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validationForm()) return;

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(result.message || "Registration successful");
        setIsError(false);

        // clear form after submitted data
        setFormData({ name: "", email: "", password: "", contact: "" });

        // redirect to home after 1 sec (1000ms = 1s)
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(result.message || "Registration failed");
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
        <h2>Create Account</h2>
        <p className="subtitle">Join us and start your journey with us</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {error.name && <p className="error">{error.name}</p>}

          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {error.email && <p className="error">{error.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error.password && <p className="error">{error.password}</p>}

          <input
            type="tel"
            name="contact"
            placeholder="Enter your contact number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          {error.contact && <p className="error">{error.contact}</p>}

          <button type="submit">Register</button>
          <button
            type="reset"
            onClick={() =>
              setFormData({ name: "", email: "", password: "", contact: "" })
            }
          >
            Reset
          </button>
        </form>

        {message && <p className={isError ? "error" : "success"}>{message}</p>}

       
        <p className="subtitle" style={{ marginTop: "10px" }}>
          Already registered?{" "}
          <Link to="/login" style={{ color: "#007bff", fontWeight: "bold" }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
