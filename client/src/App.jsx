import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Courses from './pages/Courses'
import Admin from './pages/Admin'
import Signup from './pages/Signup'
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/signup") {
      return
    } else if (localStorage.getItem('authToken') == undefined) {
      navigate("/")
    }
  }, [navigate])

  return (
    <>      
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="home" element={<Home/>}/>
                <Route path="courses" element={<Courses/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="admin" element={<Admin/>}/>
                <Route path="signup" element={<Signup/>}/>
            </Routes>
    </>
  )
}

export default App