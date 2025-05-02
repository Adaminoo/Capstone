import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({username: username, password: password})
        });

        if (!response.ok) {
          const error = await response.text();
          console.error('Login failed: ', error)
          return;
        }

        const data = await response.json()
        console.log(data)
        if (data.token !== undefined) {
          localStorage.setItem('authToken', data.token)
        navigate('/home')
        }
      } catch (error) {
        console.error('Error during login: ', error)
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
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div>{username}</div>
          </div>
        </div>
      )
}

export default Login