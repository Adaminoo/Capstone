import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'


function Courses() {
    const token = localStorage.getItem('authToken')
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [courses, setCourses] = useState([])
    const [registeredCourses, setRegisteredCourses] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                const allCoursesRes = await fetch("/api/allcourses", {
                    method: "GET",
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`,
                    }
                });
                const allCoursesData = await allCoursesRes.json();

                const userCoursesRes = await fetch(`/api/courses/${currentUser.user_id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`,
                    }
                });
                const userCoursesData = await userCoursesRes.json();
                const registeredIds = userCoursesData.map(course => course.course_id);
                const updatedCourses = allCoursesData.map(course => ({
                    ...course,
                    is_registered: registeredIds.includes(course.course_id)
                }));

                setCourses(updatedCourses);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchData();
    }, [])

    async function registerForCourse(course_id) {
        try {
            const response = await fetch(`/api/courses/${course_id}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({"username": currentUser.username})
            });
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Failed to register for course")
            }

            setCourses(prevCourses => 
                prevCourses.map(course => 
                    course.course_id === course_id 
                        ? { ...course, is_registered: true }
                        : course
                )
            );
            
        } catch (error) {
            console.error("Registration Error: ", error)
        }
    }
    
    return (
        <>
            <Navbar/>
            <div className='body'>
                <div className='coursesBody'>
                    <ul className='coursesList'>
                        {courses.map((course, index) => (
                            <li key={index} className='course'>
                                <div className='courseTop'>
                                    <div className='coursePiece'>{course.title}</div>
                                    <div className='divider'></div>
                                    <div className='coursePiece'>{course.string_id}</div>
                                </div>
                                <div className='courseBottom'>
                                    <div className='courseDesc'>{course.description}</div>
                                    <div className='courseDetails'>
                                        <div className='cdPiece'><span className='cdTitle'>Schedule: </span>{course.schedule}</div>
                                        <div className='cdPiece'><span className='cdTitle'>Classroom: </span>{course.classroom_number}</div>
                                        <div className='cdPiece'><span className='cdTitle'>Maximum Capacity: </span>{course.maximum_capacity}</div>
                                        <div className='cdPiece'><span className='cdTitle'>Credit Hours: </span>{course.credit_hours}</div>
                                        <div className='cdPiece'><span className='cdTitle'>Tuition Cost: </span>${course.tuition_cost}</div>
                                        <button 
                                            className={`cdRegister ${course.is_registered ? 'registered' : ''}`} 
                                            onClick={() => {
                                                if (!course.is_registered) {
                                                registerForCourse(course.course_id);
                                                }
                                            }}
                                            disabled={course.is_registered}
                                            >
                                            {course.is_registered ? 'Already Registered' : 'Sign up for this course!'}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>                
            </div>
        </>
    )
}

export default Courses