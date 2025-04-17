import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'


function Courses() {
    const token = localStorage.getItem('authToken')
    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch("api/allcourses", {
            method: "GET",
            headers: {'Content-Type' : 'application/json', 'Authorization' : `Bearer ${token}`},
        })
        .then((res) => res.json())
        .then((data) => {
            setCourses(data)
        })
    }, [])

    useEffect(() => {

    }, [])

    async function registerForCourse(course_id) {
        console.log(course_id)
        try {
            const response = await fetch(`/api/courses/${course_id}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({"username": "Adamino"})
            });
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Failed to register for course")
            }
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
                                        <button className='cdRegister' onClick={() => registerForCourse(course.course_id)}>Sign up for this course!</button>
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