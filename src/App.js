import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Authentication
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";

// page
import Home from "./Pages/Home";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* // Pages  */}
      <Route path="/" element={<Home/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
