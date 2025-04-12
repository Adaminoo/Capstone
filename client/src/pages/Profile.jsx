import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'


function Profile() {
    const [userData, setUserData] = useState({user_id: 0, username: '', })
    const token = localStorage.getItem('authToken');
    useEffect(() => {
        fetch('/api/profile', {
            method: "GET",
            headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${token}`},
        }) 
        .then((res) => res.json())
        .then((data) => {
            setUserData(prev => ({ ...prev, username: data.username, firstName: data.firstName, lastName: data.lastName, email: data.email, birthday: data.birthday, }))
        })
    }, [])
    console.log(userData)
    return (
        <>
            <Navbar/>        

            <div className='body'>
                <h1>{userData.username}</h1>
            </div>
        </>
    )
}

export default Profile