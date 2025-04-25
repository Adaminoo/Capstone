

async function fetchStudents() {
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch("admin/students", {
            method: "GET",
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        const students = await response.json();
        return students
    } catch (error) {
        console.error("Student fetch error: ", error)
    }
};

export default fetchStudents