import React from "react";
import { Link, Navigate, useNavigate } from "react-router";
import Logo from '../assets/images/school-logo-design-template-free-vector.jpg'

function Navbar() {

  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser');
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate("/")
  }

  const Navigation = () => {
    return (
      <div className="navigation">
        <Link to="/home">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/admin">Admin</Link>
      </div>
    )
  }

    return (
        <>
            <div className="navbar">
              <div className="titleLogo">
                <img src={Logo} id="logo" />
                <div id="title"><span style={{fontWeight: "bold", fontSize: "24px"}}>Pinnacle</span><br/> Technical Academy</div>
              </div>
              <div className="navbarButtons">
                <Navigation />
                <button id='signoutButton' onClick={handleLogout}>Sign Out</button>
              </div>
            </div>
        </>
    )
}



  

export default Navbar