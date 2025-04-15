import Navbar from '../components/Navbar'


function Courses() {

    console.log(localStorage.getItem('currentUser'))

    return (
        <>
            <Navbar/>
            <div className='body'>
                <h1>Courses</h1>
            </div>
        </>
    )
}

export default Courses