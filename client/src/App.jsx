
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState('signupPage')
  const [signup, setSignup] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    password: '',
    isAdmin: false
  })

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
      console.log(data.token)
      setStatus('homePage')
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

  if (status == 'loginPage') {
    return (
      <div className='login'>
        <div className='loginLeft'>
          <div className='loginTitle'>Student User Manager</div>
          <div id='lbs'>
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
          <div className='signupTop'>
            <div className='loginTitle'>Student User Manager</div>
          </div>
          <div className='signupBottom'>
          <input 
            id='username'
            className='userInput' 
            name='username'
            placeholder='Username'
            defaultValue={signup.username}
            onChange={handleChange}
          ></input>
            <input 
              id='firstName'
              className='userInput' 
              name='firstName'
              placeholder='First Name'
              defaultValue={signup.firstName}
              onChange={handleChange}

            ></input>
            <input 
             id='lastName'
             className='userInput' 
             name='lastName'
             placeholder='Last Name'
             defaultValue={signup.lastName}
             onChange={handleChange}
            ></input>
            <input 
              id='email'
              className='userInput' 
              name='email'
              placeholder='Email Address'
              defaultValue={signup.email}
              onChange={handleChange}
            ></input>
            <input 
              id='birthday'
              className='userInput' 
              name='birthday'
              placeholder='Date of Birth'
              defaultValue={signup.birthday}
              onChange={handleChange}
            ></input>
            <input 
              id='password'
              className='userInput' 
              name='password'
              placeholder='Password'
              defaultValue={signup.password}
              onChange={handleChange}
            ></input>
            {/* <input 
             className='userInput' 
             type='checkbox'
              id='isAdmin'
              name='isAdmin'
              
              checked={signup.isAdmin}
              onChange={handleCheck}
            ></input> */}
          </div>
        </div>
      </>
    )
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
}

export default App