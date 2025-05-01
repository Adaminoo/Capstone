import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Navigate, Link } from 'react-router';
import fetchCourses from '../utils/fetchCourses';
import fetchStudents from '../utils/fetchStudents';
import fetchStudentCourses from '../utils/fetchStudentCourses';

function Admin() {

    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [studentCourses, setStudentCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [editStudent, setEditStudent] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [popupTitle, setPopupTitle] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [editedCourse, setEditedCourse] = useState({});

    const startEditing = () => {
        setEditedCourse(selectedCourse);
        setIsEditing(true);
    };

    const handleInputChange = (field, value) => {
        setEditedCourse(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    async function saveCourseDetails() {
        console.log(editedCourse)
        try {
            const response = await fetch(`admin/courses/${editedCourse.course_id}`, {
                method: "PUT",
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({
                    "schedule" : editedCourse.schedule,
                    "classroom_number" : editedCourse.classroom_number, 
                    "maximum_capacity" : editedCourse.maximum_capacity, 
                    "credit_hours" : editedCourse.credit_hours, 
                    "tuition_cost" : editedCourse.tuition_cost
                })
            })
        } catch (error) {
            console.error("Error updating course: ", error);
        }
        setSelectedCourse(editedCourse);
        setIsEditing(false);
    }


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
    const openPopup = () => {
      setIsOpen(true);
    };
  
    const closePopup = () => {
        setIsOpen(false);
        setSelectedCourse(null);
        setStudentCourses([]);
    };

    const loadCourses = async () => {
        const allCourses = await fetchCourses();
        setCourses(allCourses);
        setStudents([])
    };

    const loadCourseDetails = (course) => {
        setSelectedCourse(course);
        setPopupTitle('Course Details');
        setIsOpen(true);
    }

    const loadStudents = async () => {
        const allStudents = await fetchStudents();
        setStudents(allStudents);
        setCourses([]);
        setPopupTitle('Unregister Student')
    }

    const loadStudentCourses = async (user_id) => {
        const selectedCourses = await fetchStudentCourses(user_id);
        setStudentCourses(selectedCourses)
        setEditStudent(user_id)
        setIsOpen(true)
    }

    async function unregisterStudent(student_id, course_id) {
        try {
            const response = await fetch(`/api/admin/courses/unregister/${student_id}/${course_id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            });

        if (response.ok) {
            setStudentCourses(prevCourses => 
                prevCourses.filter(course => course.course_id !== course_id)
            );
            setConfirmationMessage('Successfully unregistered from the course!');
            setTimeout(() => {
                setConfirmationMessage('');
            }, 3000);
        } else {
            console.error("Failed to unregister student");
        }

        } catch (error) {
            console.error("Student unregister error: ", error)
        }
    }
    
    const token = localStorage.getItem('authToken');
    const [isAdmin, setIsAdmin] = useState('false');
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

    if (isAdmin === true) {
        return (
            <>
                <Navbar/>
                <div className='body'>
                    <div className='adminBody'>
                        {isOpen && (
                        <div style={overlayStyle}>
                            <div style={popupStyle}>
                                {popupTitle}
                                {confirmationMessage && (
                                    <div style={{ color: 'green', marginBottom: '10px' }}>
                                        {confirmationMessage}
                                    </div>
                                )}
                                {studentCourses.length > 0 && (
                                    
                                    <ul className='stuCoursesList'>
                                        {studentCourses.map((stuCourse) => (
                                            <li className='adminStudentCourses' key={stuCourse.course_id}>
                                                <div>{stuCourse.title}</div>
                                                <button onClick={() => unregisterStudent(editStudent, stuCourse.course_id)}>Unregister</button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {selectedCourse && (
                                    <div className='course'>
                                        <div className='courseTop'>
                                            <div className='coursePiece'>{selectedCourse.title}</div>
                                            <div className='divider'></div>
                                            <div className='coursePiece'>{selectedCourse.string_id}</div>
                                        </div>
                                        <div className='courseBottom'>
                                                <div className='courseDesc'>{selectedCourse.description}</div>
                                                <div className='adminCourseDetails'>
                                                    {isEditing ? (
                                                        <>
                                                            <div className='adminCdPiece'>
                                                                <span className='cdTitle'>Schedule: </span>
                                                                <input 
                                                                    className='adminCourseInput'
                                                                    value={editedCourse.schedule || ''} 
                                                                    onChange={(e) => handleInputChange('schedule', e.target.value)} 
                                                                />
                                                            </div>
                                                            <div className='adminCdPiece'>
                                                                <span className='cdTitle'>Classroom: </span>
                                                                <input 
                                                                    className='adminCourseInput'
                                                                    value={editedCourse.classroom_number || ''} 
                                                                    onChange={(e) => handleInputChange('classroom_number', e.target.value)} 
                                                                />
                                                            </div>
                                                            <div className='adminCdPiece'>
                                                                <span className='cdTitle'>Maximum Capacity: </span>
                                                                <input 
                                                                    type="number"
                                                                    className='adminCourseInput'
                                                                    value={editedCourse.maximum_capacity || ''} 
                                                                    onChange={(e) => handleInputChange('maximum_capacity', e.target.value)} 
                                                                />
                                                            </div>
                                                            <div className='adminCdPiece'>
                                                                <span className='cdTitle'>Credit Hours: </span>
                                                                <input 
                                                                    type="number"
                                                                    className='adminCourseInput'
                                                                    value={editedCourse.credit_hours || ''} 
                                                                    onChange={(e) => handleInputChange('credit_hours', e.target.value)} 
                                                                />
                                                            </div>
                                                            <div className='adminCdPiece'>
                                                                <span className='cdTitle'>Tuition Cost: </span>
                                                                <input 
                                                                    type="number"
                                                                    className='adminCourseInput'
                                                                    value={editedCourse.tuition_cost || ''} 
                                                                    onChange={(e) => handleInputChange('tuition_cost', e.target.value)} 
                                                                />
                                                            </div>
                                                            <button onClick={saveCourseDetails}>Save</button>
                                                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className='cdPiece'><span className='cdTitle'>Schedule: </span>{selectedCourse.schedule}</div>
                                                            <div className='cdPiece'><span className='cdTitle'>Classroom: </span>{selectedCourse.classroom_number}</div>
                                                            <div className='cdPiece'><span className='cdTitle'>Maximum Capacity: </span>{selectedCourse.maximum_capacity}</div>
                                                            <div className='cdPiece'><span className='cdTitle'>Credit Hours: </span>{selectedCourse.credit_hours}</div>
                                                            <div className='cdPiece'><span className='cdTitle'>Tuition Cost: </span>${selectedCourse.tuition_cost}</div>
                                                            <button className='adminEditButton' onClick={startEditing}>Edit Details</button>
                                                        </>
                                                    )}
                                                </div>
                                        </div>
                                    </div>
                                )}
                                <button onClick={closePopup}>Close</button>
                            </div>
                        </div>
                        )}
                        <div className='adminSearchQ'>What would you like to search?</div>
                        <div className='searchButtons'>
                            <button onClick={() => loadStudents()}>Students</button> 
                            <button onClick={() => loadCourses()}>Courses</button>
                        </div>
                        <div className='searchResults'>
                        {courses.length > 0 && (
                            <ul className='adminCoursesList'>
                                {courses.map((course) => (
                                    <li className='adminListItem' key={course.course_id}>
                                        <span style={{fontWeight:"bold"}} >{course.title}</span>
                                        <button onClick={() => loadCourseDetails(course)}>View Details</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {students.length > 0 && (
                            <ul className='studentList'>
                                {students.map((student) => (
                                    <li className='adminListItem' key={student.user_id}>
                                        <span style={{fontWeight:"bold", fontSize:"20px"}} >{student.username}</span>
                                        <button onClick={() => loadStudentCourses(student.user_id)}>See Courses</button>
                                    </li>
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