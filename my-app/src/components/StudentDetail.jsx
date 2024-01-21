import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteStudentAsync } from "../redux toolkit/studentSlice";

export const StudentDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const students = useSelector((state) => state?.students?.students)
    const student = students?.data?.find((student) => student?._id === id)
    
    if(!student){
        return <div className="text-white font-semibold">Student not found.</div>
    }

    const handleDelete = (id) => {
        dispatch(deleteStudentAsync(id));
        navigate('/')
    }
    
    return(
        <div className="flex flex-col flex-wrap bg-gray-700 text-white">
            <div className="flex flex-col justify-center text-center gap-1 px-1 py-1">
            <h1 className="underline py-3">Student Detail</h1>
            <div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Name:</p>
                    <p>{student.name}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Age:</p>
                    <p>{student.age}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Grade:</p>
                    <p>{student.grade}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Gender:</p>
                    <p>{student.gender}</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Attendance:</p>
                    <p>{student.attendance}%</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Marks:</p>
                    <p>{student.marks}%</p>
                </div>
                <div className="flex flex-row py-1 justify-center gap-3 font-semibold">
                    <p>Class:</p>
                    <p>{student.class}</p>
                </div>
                <div className=" flex flex-row justify-center py-3 gap-3">
                    <Link to={`/students/edit/${student._id}`} state={student}>
                        <button className="bg-gray-800 text-orange-600 px-3 rounded-md">Edit Details</button>
                    </Link>
                    <button className="bg-gray-800 text-orange-600 px-3 rounded-md" onClick={() => handleDelete(student._id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
        </div>
        
    )
}