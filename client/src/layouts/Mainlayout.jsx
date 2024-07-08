import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Mainlayout = ({ isAuthenticated, handleLogout }) => {
  return (
    <>
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <main>
        <Outlet />
        </main> 
        <ToastContainer />     
    </>
  )
}

export default Mainlayout