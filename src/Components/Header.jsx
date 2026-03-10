import React from "react";

const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        
        <div className="logo">
          <h3 className="m-0">QuizMaster</h3>
        </div>

        <div className="search-bar w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search Quiz..."
          />
        </div>

      </div>
    </header>
  );
};

export default Header;