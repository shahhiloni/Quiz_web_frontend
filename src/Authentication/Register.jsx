import React, {useState} from "react";
import "../CSS/Register.css";

const Register = () => {
  // initial fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });
  // for success message
  const [message, setMessage] = useState("");
  // for error message
  const [isError, setIsError] = useState(false);

  // for every input type becasue here we insert formdata
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // for submit button when user submit the data
  const handleSubmit = async (e) => {
    e.preventDefault(); // provide browser behavior (stop reloading )

    try {
      // AJAX (Fetch / AXIOS)
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(result.message);
        setIsError(false);
        setFormData({ name: "", email: "", password: "", contact: "" });
      } else {
        setMessage(result.message || "Registration Failed");
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
        <h2> Create Account</h2>
        <p className="subtitle"> JOin us and Start your Journey with us </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="contact"
            placeholder="Enter Your contact number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <button type="submit"> Register </button>
          <button type="reset"> Reset </button>
        </form>
        {message && <p className={isError ? "error" : "success"}> {message}</p>}
      </div>
    </div>
  );
};

export default Register;

// e.preventDefault : provide only stop reloading feature  (stop reloading page)
// AJAX : After API call it can reload the page (fetch method) - Work with data
