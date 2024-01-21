import express from "express";
const router = express.Router();
import {
  getAllStudents,
  addStudent,
  editStudent,
  DeleteStudent,
} from "../controllers/student.controller.js";

router.route("/").get(getAllStudents).post(addStudent);

router.post("/:Studentid", editStudent);

router.delete("/:Studentid", DeleteStudent);

export default router;
