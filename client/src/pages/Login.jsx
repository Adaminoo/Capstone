import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        const tempUser = document.getElementById('loginUsername').value
        const tempPass = document.getElementById('loginPassword').value
        console.log('Username: ', tempUser)
        console.log('Password: ', tempPass)
    
        const url = '/api/login'
        fetch(url, {
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: tempUser,
              password: tempPass
            })
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.token !== undefined) {
            localStorage.setItem('authToken', data.token)
            localStorage.setItem('currentUser', tempUser)
            navigate("/home")
          }
        })
        .catch((err) => {
          console.error('Login error: ', err)
        })
        const token = localStorage.getItem('authToken')
        console.log(localStorage.getItem('authToken'))
    }

    return (
        <div className='login'>
          <div className='loginLeft'>
            <div className='loginTitle'>Welcome to <span style={{fontWeight: 'bold'}} >Student Portal</span></div>
            <div className='lbs'>
              <button className='loginButton' onClick={handleLogin}>Login</button>
              <Link className='signupButton' to={"signup"}>Signup</Link>
            </div>
          </div>
          <div className='loginRight'>
            <input className='loginInput' id='loginUsername' placeholder='Username'></input>
            <input className='loginInput' id='loginPassword' placeholder='Password'></input>
          </div>
        </div>
      )
}

export default Login