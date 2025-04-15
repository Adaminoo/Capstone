import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Navigate, Link } from 'react-router';

function Admin() {
    const token = localStorage.getItem('authToken');
    const [isAdmin, setIsAdmin] = useState('false');
    const [searchResults, setSearchResults] = useState()

    useEffect(() => {
        fetch("/api/profile", {
            method: "GET",
            headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${token}` },
        })
        .then((res) => res.json())
        .then((data) => {
            setIsAdmin(data.isAdmin)
        })
    })

    const searchStudents = () => {
        console.log('students searched')
    }

    const searchCourses = () => {
        console.log('courses searched')
    }

    if (isAdmin === true) {
        return (
            <>
                <Navbar/>
                <div className='body'>
                    <div className='adminBody'>
                        <div className='adminSearchQ'>What would you like to search?</div>
                        <div className='searchButtons'>
                            <button onClick={searchStudents}>Students</button> 
                            <button onClick={searchCourses}>Courses</button>
                        </div>
                        <div className='searchResults'>{}</div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='body'>
                    <div className='notAdminbody'>
                        <h1>Unauthorized User!</h1>
                        <Link className='flexdiv' to={"/home"}>Click to return</Link>
                    </div>
                </div>
            </>
        )
    }
    
}

export default Admin