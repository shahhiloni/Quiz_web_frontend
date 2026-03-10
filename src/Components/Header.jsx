import React from "react";
import "../CSS/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">

      
        <div className="logo">
          <h2>QuizMaster</h2>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search Quiz..." />
          <button>Search</button>
        </div>

      </div>
    </header>
  );
};

export default Header;