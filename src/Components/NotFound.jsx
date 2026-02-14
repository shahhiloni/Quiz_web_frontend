import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "120px", margin: "0" }}>404</h1>
      <h2 style={{ marginBottom: "10px" }}>Page Not Found</h2>
      <p style={{ opacity: 0.8 }}>
        Oops! The page you are looking for doesn’t exist.
      </p>

      <Link
        to="/login"
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "#fff",
          color: "#764ba2",
          borderRadius: "30px",
          textDecoration: "none",
          fontWeight: "bold",
          transition: "0.3s",
        }}
      >
        Go to Login
      </Link>
    </div>
  );
};

export default NotFound;
