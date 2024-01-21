import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    enum: ["A+", "A", "B+", "B", "C+", "C", "D+", "D", "E+", "E", "F"],
    default: "F",
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male",
  },
  attendance: {
    type: Number,
    default: 0,
  },
  marks: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    enum: [
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
      "Std XII",
    ],
    default: "Std I",
  },
});

const Student = mongoose.model("Student", studentSchema);

export  { Student };
