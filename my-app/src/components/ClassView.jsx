import { useDispatch, useSelector } from "react-redux"
import { applyFilters, classes, genders, sortOptions } from "../utils/ClassUtils";
import { fetchStudents, setClassFilter, setGenderFilter, setSortBy } from "../redux toolkit/studentSlice";
import { useEffect } from "react";
import { StudentList } from "./StudentList";

export const ClassView = () => {
   const dispatch = useDispatch();
   const { students, genderFilter, sortBy, classFilter, error, status} = useSelector((state) => state.students)
   
   const filteredStudents = applyFilters(
    students.data, classFilter, genderFilter, sortBy
   )
   const handleClassChange = (e) => dispatch(setClassFilter(e.target.value))
   const handleFilterChange = (e) => dispatch(setGenderFilter(e.target.value))
   const handleSortChange = (e) => dispatch(setSortBy(e.target.value))

   useEffect(() => {
    if(students.length === 0){
        dispatch(fetchStudents())
    }
   },[])

   return(
    <div className="flex flex-col px-3 py-3 gap-4 text-white">
        <h1>Class View</h1>
        <div className="flex flex-wrap gap-2">
            <label className="flex justify-center text-center gap-2">
                Class:
                <select className="rounded-md text-black bg-gray-200" id="class" onChange={handleClassChange}>
                    {classes.map((item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </label>
            <label className="flex justify-center text-center gap-2">
                Filter by Gender:
                <select className="rounded-md text-black bg-gray-200" id="filter" onChange={handleFilterChange}>
                    {genders.map((gender) => (
                        <option value={gender} key={gender}>
                            {gender}
                        </option>
                    ))}
                </select>
            </label>
            <label className="flex justify-center text-center gap-2">
                Sort By:
                <select className="rounded-md text-black bg-gray-200" id="sort" onChange={handleSortChange}>
                        {sortOptions.map((sort) => (
                            <option value={sort} key={sort}>
                                {sort}
                            </option>
                        ))}
                </select>
            </label>
        </div>

        {status === "loading" && <p>Loading....</p>}
        {error && <p>Error: {error}</p>}

        <StudentList students={filteredStudents}/>
    </div>
   )
}


