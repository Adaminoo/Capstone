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
      console.error("Token error, value: ", localStorage.getItem('authToken'))
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

  {/* 
  const [status, setStatus] = useState('loginPage')
  

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
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('currentUser', tempUser)
        setStatus('homePage')
      }
    })
    .catch((err) => {
      console.error('Login error: ', err)
    })
  }

  

  
  
  // const handleCheck = (e) => {
  //   const { name, checked } = e.target;
  //   setSignup(prevSignup => ({
  //     ...prevSignup,
  //     [name]: checked 
  //   }));
  // }

  if (status == 'loginPage') {
    return (
      <div className='login'>
        <div className='loginLeft'>
          <div className='loginTitle'>Student User Manager</div>
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

  if (status == 'signupPage') {
    return (
      <>
        <div className='signup'>
          
        </div> 
      </>
    )
  }

  if (status == 'homePage') {
    return <HomePage />
  }

  return (
    <>
      <div className='body'>
        <div className='top'>
          <div className='title'>Student User Manager</div>
          <div className='links'></div>
        </div>
        <div className='bottom'>
        </div>
      </div>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

    </>
  )
  */}
}

export default App