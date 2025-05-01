import { useState } from "react"
import { Link } from "react-router"
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    setErrorMessage('');
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signup)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Signup successful', data);
      navigate("/login")
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

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const popupStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  };

  return (
    <>
      <div className="body">
        <div className="signup">
        <div className='signupTop'>
            <div className='signupTitle'>Student User Manager</div>
          </div>
          <div className='signupBottom'>
          <div className="userInputWrap">
            <input 
              id='username'
              className='userInput'
              name='username'
              placeholder='Username'
              defaultValue={signup.username}
              onChange={handleChange}
            ></input>
          </div>
            <div className="userInputWrap">
            <input
              id='password'
              className='userInput' 
              name='password'
              placeholder='Password'
              defaultValue={signup.password}
              onChange={handleChange}
            ></input>
            </div>
            <div className="userInputWrap">
              <input 
                id='firstName'
                className='userInput' 
                name='firstName'
                placeholder='First Name'
                defaultValue={signup.firstName}
                onChange={handleChange}
              ></input>
            </div>
            <div className="userInputWrap">
              <input 
                id='lastName'
                className='userInput'
                name='lastName'
                placeholder='Last Name'
                defaultValue={signup.lastName}
                onChange={handleChange}
              ></input>
            </div>
            <div className="userInputWrap">
              <input 
                  id='email'
                  className='userInput' 
                  name='email'
                  placeholder='Email Address'
                  defaultValue={signup.email}
                  onChange={handleChange}
              ></input>
              {emailError && <div style={{ color: 'red', fontSize: '0.8em' }}>{emailError}</div>}
            </div>
            <div className="userInputWrap">
              <input 
                id='birthday'
                type="date"
                className='userInput' 
                name='birthday'
                placeholder='Date of Birth'
                defaultValue={signup.birthday}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className='lbs'>
            <button className='confSignupButton' onClick={handleSignup}>Signup</button>
            <Link to={"/"} className='signupButton'>Login</Link>
            <button onClick={() => setIsOpen(true)}>test</button>
          </div>
          {isOpen && (
            <div style={overlayStyle}>
              <div style={popupStyle}>
                
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )  
}



export default Signup