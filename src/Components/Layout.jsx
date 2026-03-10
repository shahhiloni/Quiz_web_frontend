import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from './Footer';

const Layout = () => {
  return (
   <>
   <Header />
    <Navbar />
    <main> 
      <Outlet />
    </main>
    <Footer />
    </>
  
  )
}

export default Layout
