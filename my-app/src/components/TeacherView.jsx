import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchTeachers } from "../redux toolkit/teacherSlice";
import { Link } from "react-router-dom";
import { TeacherList } from "./TeacherList";

export const TeacherView = () => {
    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.teachers.teachers)
    const status = useSelector((state) => state?.teachers?.status);
    const error = useSelector((state) => state?.teachers?.error)

    useEffect(() => {
        if(status === "idle"){
            dispatch(fetchTeachers())
        }
    },[status, dispatch])

    return(
        <div className="px-4 py-4 flex flex-col gap-2 text-white">
            <h1>Teachers View</h1>
            <Link to={'/teachers/add'} className="flex flex-col justify-center items-center">
                <button className="px-2 py-2 bg-gray-600 font-semibold rounded-md">Add Teacher</button>
            </Link>
            {status === "loading" && <p>Loading....</p>}
            {error && <p>Error: {error}</p>}

            <TeacherList teachers={teachers}/>
        </div>
    )
}