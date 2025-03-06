// client/src/App.jsx

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [signup, setSignup] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    birthday: '',
    password: '',
    isAdmin: ''
  })
console.log('signup: ' + signup.username)

  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  function handleChange({ target }) {
    console.log(target.value, target.name)
    const _signup = { ...signup };
    console.log(signup)
    setSignup(target.name, target.value);
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
            value={signup.username}
            onChange={handleChange}
          ></input>
            <input className='userInput' id='firstName'></input>
            <input className='userInput' id='firstName'></input>
            <input className='userInput' id='email'></input>
            <input className='userInput' id='birthday'></input>
            <input className='userInput' id='password'></input>
            <input className='userInput' id='isAdmin'></input>
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

