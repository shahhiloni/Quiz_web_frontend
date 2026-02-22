import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import "../CSS/Register.css";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
       
        email: "",
        password: "",
        
      });

       // for success message
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // for input validation error
  const [error, setError] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*])(?=.*[0-9]).{8,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validationForm = () => {
    let newError = {};

    if (!emailRegex.test(formData.email)) {
        newError.email = "Enter a valid email address";
      }
      if (!passwordRegex.test(formData.password)) {
        newError.password =
          "Password must be 8+ chars with uppercase, lowercase, number & special character";
      }
  
      setError(newError);
      return Object.keys(newError).length === 0;
    };
  
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
    
if(result.token) {
    localStorage.setItem("token", result.token);
}

            // clear form after submitted data
            setFormData({ email: "", password: ""});
    
            // redirect to home after 1 sec (1000ms = 1s)
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
        <p className="subtitle">Join us and start your journey with us</p>
        <form onSubmit={handleSubmit}>
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
            type="text"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error.password && <p className="error">{error.password}</p>}
          <button type="submit">Login</button>
</form>
{message && <p className={isError ? "error" : "success"}>{message}</p>}
<p> Do You have An account??
        <Link to="/register"> Register Here</Link>
      </p>
</div>
</div>

  )
}

export default Login
