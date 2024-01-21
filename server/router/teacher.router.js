import express from "express";
const router = express.Router();
import {
  getAllTeachers,
  addTeacher,
  editTeacher,
  DeleteTeacher,
} from "../controllers/teacher.controller.js";

router.route("/").get(getAllTeachers).post(addTeacher);

router.post("/:Teacherid", editTeacher);

router.delete("/:Teacherid", DeleteTeacher);

export default router;
