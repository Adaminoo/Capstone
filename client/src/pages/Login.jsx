import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('')

    const handleLogin = async () => {
        const tempUser = document.getElementById('loginUsername').value
        const tempPass = document.getElementById('loginPassword').value
    
        const url = '/api/login'
        const res = await fetch(url, {
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: tempUser,
              password: tempPass
            })
        });

        const data = await res.json();
        console.log(data)
        setError(data.message)
        if (data.token !== undefined) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('currentUser', tempUser);
          navigate("/home");
        }
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
            <input className='loginInput' type='password' id='loginPassword' placeholder='Password'></input>
            <div>{error}</div>
          </div>
        </div>
      )
}

export default Login