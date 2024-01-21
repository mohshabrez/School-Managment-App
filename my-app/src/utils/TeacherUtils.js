export const validateTeacherInput = (teacherInput) => {
    const {name, subject, contact} = teacherInput;

    if(!name || !subject || !contact){
        return false;
    }
    return true
}