import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Authentication
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";

//not Found 
import NotFound from './Components/NotFound';

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

      {/* Url not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
