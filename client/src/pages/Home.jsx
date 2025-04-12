import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { Navigate } from 'react-router';
import Navbar from '../components/Navbar'

function Home() {
    const authToken = localStorage.getItem("authToken")
  if (!authToken) {
    console.log('test')
    return (
    <Navigate to="/"/>

    )
  }
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                
            </div>
        </>
    )
}

export default Home