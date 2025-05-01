

async function fetchStudentCourses(user_id) {
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch(`api/courses/${user_id}`, {
            method: "GET",
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        const studentCourses = await response.json();
        console.log(studentCourses)
        return studentCourses
    } catch (error) {
        console.error("Student course fetch error: ", error)
    }
}

export default fetchStudentCourses