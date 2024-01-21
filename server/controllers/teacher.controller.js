import { Teacher } from "../models/teacher.model.js";

const getAllTeachers = async (req, res) => {
  try {
    const TeachersData = await Teacher.find({});
    if (TeachersData.length === 0) {
      return res.status(400).json({ message: "The data is empty" });
    } else {
      return res.status(200).json(TeachersData);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while fetching the Teachers Data",
    });
  }
};

const addTeacher = async (req, res) => {
  try {
    const addingTeacher = req.body;
    const getTeacher = new Teacher(addingTeacher);
    const addedTeacher = await getTeacher.save();
    return res.status(200).json({ data: addedTeacher });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occured while adding the Teacher" });
  }
};

const editTeacher = async (req, res) => {
  const TeacherId = req.params.Teacherid;
  const TeacherData = req.body;
  if (!TeacherId || !TeacherData) {
    return res
      .status(400)
      .json({ message: "Please provide the data and paramsId" });
  } else {
    try {
      const editingTeacher = await Teacher.findByIdAndUpdate(
        TeacherId,
        TeacherData,
        { new: true },
      );
      return res.status(200).json(editingTeacher);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error occured while updating the studnet Data" });
    }
  }
};

const DeleteTeacher = async (req, res) => {
  try {
    const TeacherId = req.params.Teacherid;
    if (TeacherId) {
      const deletedTeacher = await Teacher.findByIdAndDelete(TeacherId);
      return res
        .status(200)
        .json({ message: "Successfully deleted the Teacher Data" });
    } else {
      return res.status(400).json({ message: "Please provide the Id" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occured while deleting the Teacher" });
  }
};

export { getAllTeachers, addTeacher, editTeacher, DeleteTeacher };
