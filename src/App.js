import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './Components/Layout';

// Authentication
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import ForgetPassword from "./Authentication/ForgetPassword";

//not Found 
import NotFound from './Components/NotFound';

// page
import Home from "./Pages/Home";
import Feedback from "./Pages/Feedback";
import Contact from "./Pages/Contact";
import Questions from './Pages/Questions';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      {/* // Authentication */}
      <Route path="/Register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path ="/forget-password" element={<ForgetPassword />} />

      {/* // Pages  */}
      <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
      <Route path="/feedback" element={<Feedback/>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Home/>} />
      <Route path="/questions/:id" element={<Questions />}/>
    
      {/* Url not found */}
      <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
