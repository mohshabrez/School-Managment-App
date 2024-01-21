export const grades = [
    "A+",
    "A",
    "B+",
    "B",
    "C+",
    "C",
    "D+",
    "D",
    "E+",
    "E",
    "F"
]

export const classes = [
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

export const validateStudentInput = (studentInput) => {
    const { name, age, grade, gender, attendance, marks, class: standard} = studentInput

    if( !name || !age || !grade || !gender || !attendance || !marks || !standard){
        return false;
    }
    return true;
}