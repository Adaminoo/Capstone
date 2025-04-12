import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();

    
    const [tokenStatus, setTokenStatus] = useState(false)

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
          console.log(data)
          if (data.token !== undefined) {
            console.log(data.token)
            localStorage.setItem('authToken', data.token)
            localStorage.setItem('currentUser', tempUser)
            navigate("/home")
          }
        })
        .catch((err) => {
          console.error('Login error: ', err)
        })
      }

    return (
        <div className='login'>
          <div className='loginLeft'>
            <div className='loginTitle'>Welcome to <span style={{fontWeight: 'bold'}} >Student Portal</span></div>
            <div className='lbs'>
              <button className='loginButton' onClick={handleLogin}>Login</button>
              <button className='signupButton' onClick={() => setStatus('signupPage')}>Signup</button>
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