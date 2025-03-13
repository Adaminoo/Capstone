// client/src/App.jsx

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [signup, setSignup] = useState({
    username: "",
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    password: '',
    isAdmin: false
  })

  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  useEffect(() => {
    fetch('/api/login')
    .then((res) => {
      console.log(res)
    })
  })

  const handleLogin = (e) => {
    fetch('/api/login')
    .then((res) => {
      console.log(res)
    })
  }

  {/*function handleChange({ target }) {
    console.log(target.value, target.name)
    const _signup = { ...signup, [name]: value };
    setSignup(target.name, target.value);
    console.log(signup)

  }*/}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup(prevSignup => ({
      ...prevSignup,
      [name]: value
    }));
    console.log(signup)
  };
  
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setSignup(prevSignup => ({
      ...prevSignup,
      [name]: checked 
    }));
  }

  return (
    <>
      <div className='body'>
        <div className='top'>
          <div className='title'>Student User Manager</div>
          <div className='links'></div>
        </div>
        <div className='bottom'>
          <div className='signup'>
          <input 
            className='userInput' 
            id='username'
            name='username'
            defaultValue={signup.username}
            onChange={handleChange}
          ></input>
            <input 
              className='userInput' 
              id='firstName'
              name='firstName'
              defaultValue={signup.firstName}
              onChange={handleChange}

            ></input>
            <input 
             className='userInput' 
             id='lastName'
             name='lastName'
             defaultValue={signup.lastName}
             onChange={handleChange}
            ></input>
            <input 
              className='userInput' 
              id='email'
              name='email'
              defaultValue={signup.email}
              onChange={handleChange}
            ></input>
            <input 
             className='userInput' 
              id='birthday'
              name='birthday'
              defaultValue={signup.birthday}
              onChange={handleChange}
            ></input>
            <input 
             className='userInput' 
              id='password'
              name='password'
              defaultValue={signup.password}
              onChange={handleChange}
            ></input>
            <input 
             className='userInput' 
             type='checkbox'
              id='isAdmin'
              name='isAdmin'
              checked={signup.isAdmin}
              onChange={handleCheck}
            ></input>
          </div>
        </div>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
         <h1>{!data ? "Loading..." : data}</h1>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

    </>
  )
}

export default App

