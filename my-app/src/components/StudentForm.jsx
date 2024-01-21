import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { classes, grades, validateStudentInput } from "../utils/StudentUtils";
import { addStudentAsync, updateStudentAsync } from "../redux toolkit/studentSlice";

export const StudentForm = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const student = state ? state: null;

    const [studentInput, setStudentInput] = useState({
        name: student ? student.name : "",
        age: student ? student.age : 0,
        grade: student ? student.grade : grades[0],
        gender: student ? student.gender : "Male",
        attendance: student ? student.attendance : 0,
        marks: student ? student.marks : 0,
        class: student ? student.class : classes[0]
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValidated = validateStudentInput(studentInput)

        if(isValidated){
            setError("");

            if(student){
                dispatch(
                    updateStudentAsync({ id: student._id, updatedStudent: studentInput })    
                )
                navigate(`/students/${student._id}`)
            }else{
                dispatch(addStudentAsync(studentInput))
                navigate('/')
            }
        }else{
            setError("Please fill all the required fields")
        }
    }

    return(
        <div className="flex flex-col justify-center items-center py-20">
            <div className="flex flex-col flex-wrap justify-between rounded-md  max-w-max gap-2 px-5 py-5 text-center bg-slate-700 text-white  place-items-center">
            <h1>{student ? "Edit Student" : "Add Student"}</h1>
            <form className="flex flex-col gap-5 py-2">
                <label className="flex justify-between px-2">Name:
                    <input className="bg-gray-800 rounded-md" required placeholder="Enter Name" type="text" value={studentInput.name} onChange={(e) => setStudentInput({...studentInput, name: e.target.value})}/>
                </label>
                <label className="flex justify-between px-2">
                    Age:
                    <input className="rounded-md bg-gray-800" required placeholder="Age" type="number" min={0} value={studentInput.age} onChange={(e) => setStudentInput({ ...studentInput, age: e.target.value})}/>
                </label>
                <label className="flex justify-between  px-2">
                    Grade:
                    <select className="bg-gray-800" onChange={(e) => setStudentInput({ ...studentInput, grade: e.target.value})} value={studentInput.grade}>
                        {grades.map((grade) => (
                            <option value={grade} key={grade}>
                                {grade}
                            </option>
                        ))}
                    </select>
                </label>
                <div>
                    <label className="flex justify-between  px-2">
                        Gender:
                        <label>
                            <input type="radio" value="Male" name="gender" checked={studentInput.gender === "Male"} onChange={(e) => setStudentInput({ ...studentInput, gender: e.target.value})}/>
                            Male:
                        </label>
                        <label>
                            <input type="radio" value="Female" name="gender" checked={studentInput.gender === "Female"} onChange={(e) => setStudentInput({ ...studentInput, gender: e.target.value})}/>
                            Female:
                        </label>
                    </label>
                </div>
                <label className="flex justify-between px-2">
                    Attendance:
                    <input className="rounded-md bg-gray-800" type="number" required value={studentInput.attendance} name="attendance" min={0} placeholder="Attendance" onChange={(e) => setStudentInput({ ...studentInput, attendance: e.target.value})}/>
                </label>
                <label className="flex justify-between px-2">
                    Marks:
                    <input className="rounded-md bg-gray-800" type="number" required value={studentInput.marks} name="marks" max={100} placeholder="Marks" onChange={(e) => setStudentInput({ ...studentInput, marks: e.target.value})}/>
                </label>
                <label className="flex justify-between px-2">
                    Class:
                    <select className="bg-gray-800" onChange={(e) => setStudentInput({ ...studentInput, class: e.target.value})} value={studentInput.class}>
                        {classes.map((standard) => (
                            <option value={standard} key={standard}>
                                {standard}
                            </option>
                        ))}
                    </select>
                </label>
                {error && <small>*{error}</small>}
                <button className="bg-gray-800 rounded-md w-fit-content px-2 py-0.5 font-semibold" onClick={handleSubmit}>
                    {student ? "Update": "Add"}
                </button>
            </form>
        </div>
        </div>
        
    )
}