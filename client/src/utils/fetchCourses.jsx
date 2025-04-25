

async function fetchCourses() {
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch("/api/allcourses", {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        });
        const courses = await response.json();
        return courses;
    } catch (error) {
        console.error("fetchCourses Error: ", error)
    }
}

export default fetchCourses