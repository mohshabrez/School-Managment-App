import { Student } from "../models/student.model.js";

const getAllStudents = async (req, res) => {
  try {
    const studentsData = await Student.find({});
    if (studentsData.length === 0) {
      return res.status(400).json({ message: "The data is empty" });
    } else {
      return res.status(200).json({ data: studentsData });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while fetching the students Data",
    });
  }
};

const addStudent = async (req, res) => {
  try {
    const studentData = req.body;
    const addingStudent = new Student(studentData);
    const addedStudent = await addingStudent.save();
    return res.status(200).json(addedStudent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error occured while adding the student",
      error: error,
    });
  }
};

const editStudent = async (req, res) => {
  const studentId = req.params.Studentid;
  const studentData = req.body;

  if (!studentId || !studentData) {
    return res
      .status(400)
      .json({ message: "Please provide the data and paramsId" });
  } else {
    try {
      const editingStudent = await Student.findByIdAndUpdate(
        studentId,
        studentData,
        { new: true },
      );
      return res.status(200).json({
        data: editingStudent,
        message: "Successfully updated the student Data",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error occured while updating the studnet Data" });
    }
  }
};

const DeleteStudent = async (req, res) => {
  try {
    const studentId = req.params.Studentid;
    if (studentId) {
      const deletedStudent = await Student.findByIdAndDelete(studentId);
      return res
        .status(200)
        .json({ message: "Successfully deleted the student Data" });
    } else {
      return res.status(400).json({ message: "Please provide the Id" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occured while deleting the student" });
  }
};

export { getAllStudents, addStudent, editStudent, DeleteStudent };
