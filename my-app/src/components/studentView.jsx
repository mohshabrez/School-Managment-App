import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchStudents } from "../redux toolkit/studentSlice";
import { Link } from "react-router-dom";
import { StudentList } from "./StudentList";

export const StudentView = () => {
    const dispatch = useDispatch()
    const students = useSelector((state) => state.students.students);
    const status = useSelector((state) => state.students.status)
    const error = useSelector((state) => state.students.error)

    useEffect(() => {
        if(status === "idle"){
            dispatch(fetchStudents())
        }
    },[status, dispatch])

    return(
        <div className="px-4 py-4 flex flex-col gap-2 text-white">
            <h1>Student View</h1>
            <Link to={'/students/add'} className="flex flex-col justify-center items-center">
                <button className="px-2 py-2 bg-gray-600 font-semibold rounded-md">Add Student</button>
            </Link>
            {status === "loading" && <p>Loading....</p>}
            {error && <p className="text-red-800">*Error: {error}</p>}

            <StudentList students={students}/>
        </div>
    )

}  
