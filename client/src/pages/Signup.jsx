import { useState } from "react"
import { Link } from "react-router"

function Signup() {
  
  const [signup, setSignup] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    password: '',
    isAdmin: false
  })

  const handleSignup = async () => {
    console.log(signup)
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signup)
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Signup successful', data);
      return data;
    } catch (error) {
      console.error('Signup failed:' , error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup(prevSignup => ({
      ...prevSignup,
      [name]: value
    }));
  };

  return (
    <>
      <div className="body">
        <div className="signup">
        <div className='signupTop'>
            <div className='signupTitle'>Student User Manager</div>
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
              id='password'
              className='userInput' 
              name='password'
              placeholder='Password'
              defaultValue={signup.password}
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
          </div>
          <div className='lbs'>
            <button className='confSignupButton' onClick={handleSignup}>Signup</button>
            <Link to={"/"} className='signupButton'>Login</Link>
          </div>
        </div>
      </div>
    </>
  )  
}



export default Signup