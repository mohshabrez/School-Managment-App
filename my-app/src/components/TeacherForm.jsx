import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { validateTeacherInput  } from "../utils/TeacherUtils";
import { addTeacherAsync, updateTeacherAsync } from "../redux toolkit/teacherSlice";

export const TeacherForm = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const teacher = state ? state: null;

    const [teacherInput, setTeacherInput] = useState({
        name: teacher ? teacher.name : "",
        subject: teacher ? teacher.subject : "",
        contact: teacher ? teacher.contact : 0,
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValidated = validateTeacherInput(teacherInput)

        if(isValidated){
            setError("");

            if(teacher){
                dispatch(
                    updateTeacherAsync({ id: teacher._id, updatedTeacher: teacherInput })    
                )
                navigate(`/teachers/${teacher._id}`)
            }else{
                dispatch(addTeacherAsync(teacherInput))
                navigate('/teachers')
            }
        }else{
            setError("Please fill all the required fields")
        }
    }

    return(
        <div className="flex flex-col justify-center items-center py-20">
            <div className="flex flex-col flex-wrap justify-between rounded-md  max-w-max gap-2 px-5 py-5 text-center bg-slate-700 text-white  place-items-center">
            <h1>{teacher ? "Edit Teacher" : "Add Teacher"}</h1>
            <form className="flex flex-col gap-5 py-2">
                <label className="flex justify-between px-2">Name:
                    <input className="bg-gray-800 rounded-md" required placeholder="Enter Name" type="text" value={teacherInput.name} onChange={(e) => setTeacherInput({...teacherInput, name: e.target.value})}/>
                </label>
                <label className="flex justify-between px-2">
                    Subject:
                    <input className="rounded-md bg-gray-800" required placeholder="Enter Subject" type="text"  value={teacherInput.subject} onChange={(e) => setTeacherInput({ ...teacherInput, subject: e.target.value})}/>
                </label>
                <label className="flex justify-between px-2">
                    Contact:
                    <input className="rounded-md bg-gray-800" type="number" required value={teacherInput.contact} name="contact" placeholder="Enter Contact No:" onChange={(e) => setTeacherInput({ ...teacherInput, contact: e.target.value})}/>
                </label>
                
                {error && <small className="text-red-800">*{error}</small>}
                <button className="bg-gray-800 rounded-md w-fit-content px-2 py-0.5 font-semibold" onClick={handleSubmit}>
                    {teacher ? "Update": "Add"}
                </button>
            </form>
        </div>
        </div>
        
    )
}