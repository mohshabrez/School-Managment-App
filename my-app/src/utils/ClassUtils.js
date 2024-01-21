export const classes = [
    "All",
    "Std I",
    "Std II",
    "Std III",
    "Std IV",
    "Std V",
    "Std VI",
    "Std VII",
    "Std VIII",
    "Std IX",
    "Std X",
    "Std XI",
    "Std XII"
]

export const genders = ["All", "Male", "Female"]

export const sortOptions = ["Select", "Name", "Age", "Attendance", "Marks"];

export const applyFilters = (students, classFilter, genderFilter, sortBy ) => {
    let filteredStudents = [...students]

    filteredStudents = filteredStudents.filter((student) => classFilter === "All" ? true : student.class === classFilter )

    filteredStudents = filteredStudents.filter((student) => genderFilter === "All" ? true : student.gender === genderFilter)

    filteredStudents = [...filteredStudents].sort((a,b) => {
        if(sortBy === sortOptions[1]){
            return  a.name.localeCompare(b.name);
        }
        if(sortBy === sortOptions[2]){
            return a.age - b.age;
        }
        if(sortBy === sortOptions[3]){
            return a.attendance - b.attendance
        }
        if(sortBy === sortOptions[4]){
            return a.marks - b.marks
        }
        return 0
        
    })
    return filteredStudents

}