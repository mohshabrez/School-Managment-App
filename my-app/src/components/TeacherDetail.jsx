import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteTeacherAsync } from "../redux toolkit/teacherSlice";

export const TeacherDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const teachers = useSelector((state) => state?.teachers?.teachers)
    const teacher = teachers?.find((teacher) => teacher?._id === id)
    
    if(!teacher){
        return <div className="text-white font-semibold">Teacher not found.</div>
    }

    const handleDelete = (id) => {
        dispatch(deleteTeacherAsync(id));
        navigate('/teachers')
    }
    
    return(
        <div className="flex flex-col flex-wrap bg-gray-700 text-white">
            <div className="flex flex-col justify-center text-center gap-1 px-1 py-1">
            <h1 className="underline py-3">Teacher Detail</h1>
            <div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Name:</p>
                    <p>{teacher.name}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Subject:</p>
                    <p>{teacher.subject}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Contact:</p>
                    <p>{teacher.contact}</p>
                </div>
                <div className=" flex flex-row justify-center py-3 gap-3">
                    <Link to={`/teachers/edit/${teacher._id}`} state={teacher}>
                        <button className="bg-gray-800 text-orange-600 px-3 rounded-md">Edit Details</button>
                    </Link>
                    <button className="bg-gray-800 text-orange-600 px-3 rounded-md" onClick={() => handleDelete(teacher._id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
        </div>
        
    )
}