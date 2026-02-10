import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Authentication
import Register from "./Authentication/Register";

// page

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
