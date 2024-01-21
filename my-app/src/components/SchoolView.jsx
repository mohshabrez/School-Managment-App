import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchStudents } from "../redux toolkit/studentSlice"

export const SchoolView = () => {
    const students = useSelector((state) => state.students.students.data)
    const status = useSelector((state) => state.students.status)
    const error = useSelector((state) => state.students.error)
    const dispatch = useDispatch()


    const totalStudents = students?.length;

    const avergareAttendance = students?.reduce((total, curr) => (total += curr.attendance), 0)/ totalStudents

    const averageMarks = students?.reduce((total, curr) => (total += curr.marks), 0)/ totalStudents

    const topStudent = students?.reduce((topper, curr) => {
        if(curr.marks > topper.marks){
            topper = {
                name: curr.name,
                marks: curr.marks
            }
        }
        return topper
    }, {name: "", marks: 0})

    useEffect(() => {
        if(students?.length === 0){
            dispatch(fetchStudents())
        }
    },[])

    return(
        <div className="px-4 py-4 flex flex-col justify-center text-center gap-2 text-white">
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
  
        {status !== "loading" && students && (
          <>
            <p>
              <strong>Total Students: </strong>
              {totalStudents}
            </p>
            <p>
              <strong>Average Attendance: </strong>
              {avergareAttendance.toFixed(2)}
            </p>
            <p>
              <strong>Average Marks: </strong>
              {averageMarks.toFixed(2)}
            </p>
            <p>
              <strong>Top Student: </strong>
              {topStudent.name}
            </p>
          </>
        )}
      </div>
    )
}