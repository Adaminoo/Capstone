import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Navigate, Link } from 'react-router';
import fetchCourses from '../utils/fetchCourses';
import fetchStudents from '../utils/fetchStudents';

function Admin() {

    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);


    const loadCourses = async () => {
        const allCourses = await fetchCourses();
        setCourses(allCourses);
    };

    const loadStudents = async () => {
        const allStudents = await fetchStudents();
        setStudents(allStudents);
    }
    
    const token = localStorage.getItem('authToken');
    const [isAdmin, setIsAdmin] = useState('false');
    const [searchResults, setSearchResults] = useState();
    useEffect(() => {

        fetch("/api/profile", {
            method: "GET",
            headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${token}` },
        })
        .then((res) => res.json())
        .then((data) => {
            setIsAdmin(data.isAdmin)
        })
    }, [])

        // const fetchStudents = async () => {
        //     try {
        //         const response = await fetch("/admin/students", {
        //             method: "GET",
        //             headers: {
        //                 "Authorization": `Bearer ${token}`,
        //             },
        //         });
        //         const students = await response.json();
        //         return students;
        //     } catch (error) {
        //         console.error("Student Fetch Error: ", error);
        //     }
        // };

    if (isAdmin === true) {
        return (
            <>
                <Navbar/>
                <div className='body'>
                    <div className='adminBody'>
                        <div className='adminSearchQ'>What would you like to see?</div>
                        <div className='searchButtons'>
                            <button onClick={() => loadStudents()}>Students</button> 
                            <button onClick={() => loadCourses()}>Courses</button>
                        </div>
                        <div className='searchResults'>
                        {courses.length > 0 && (
                            <ul className='coursesList'>
                                {courses.map((course) => (
                                    <li key={course.course_id}>{course.title}</li>
                                ))}
                            </ul>
                        )}
                        {students.length > 0 && (
                            <ul className='studentList'>
                                {students.map((student) => (
                                    <li key={student.user_id}>{student.username}<button>test</button></li>
                                    
                                ))}
                            </ul>
                        )}
                        </div>
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