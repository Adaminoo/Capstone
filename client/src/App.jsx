
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState('loginPage')
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

  const handlePage = () => {

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
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

    </>
  )
}

export default App