import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { Navigate, useNavigate, Link } from 'react-router';
import Navbar from '../components/Navbar'
import Background from '../assets/images/ARC_Website_Content_Study_Groups.jpeg'
import RightArrow from '../assets/icons/arrow_forward_ios_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png'
import updateUsername from '../utils/updateUsername';

function Home() {

    const [currentUser, setCurrentUser] = useState()
    const navigate = useNavigate();
    const authToken = localStorage.getItem("authToken")
  if (!authToken) {
    console.log('test')
    return (
    <Navigate to="/"/>
    )
  }
  useEffect(() => {
    fetch("/api/profile", {
        method: "GET",
        headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${authToken}` },
    })
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        const storedUser = localStorage.getItem('currentUser')
        console.log(storedUser, 'hi')
        setCurrentUser(JSON.parse(storedUser))
    })
  }, [])
    
//   useEffect(() => {
//     const fetchUserProfile = () => {
//         const token = localStorage.getItem('authToken');
//         const currentUser = localStorage.getItem('currentUser')
//         console.log(currentUser)
//         if (!token) {
//             console.error('No auth token found!');
//             return;
//         }

//         fetch('/api/profile', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(res => {
//             console.log(res)
//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then(data => {
//             console.log(data);
//         })
//         .catch(error => {
//             console.error('Error: ', error);
//         });
//     };

//     fetchUserProfile();
// }, []);


    return (
        <>
            <Navbar/>
            <div className='body'>
                <div className='home'>
                    <img src={Background} className='homeBackground'/>
                    <div className='homeText'>
                        <div className='homeTitle'>PINNACLE TECHNOLOGY ACADEMY</div>
                        <div style={{marginBottom: "10px"}} >Developing real-world skills. Shaping bright futures. Driving tomorrow's innovation.</div>
                        <Link className='homeNavButton' to={"/courses"} >Want to see our courses?<img src={RightArrow} /></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home