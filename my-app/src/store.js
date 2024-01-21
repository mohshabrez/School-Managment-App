import { configureStore } from "@reduxjs/toolkit";
import { studentsSlice } from "./redux toolkit/studentSlice";
import { teacherSlice } from "./redux toolkit/teacherSlice";

export default configureStore({
    reducer:{
        students: studentsSlice.reducer,
        teachers: teacherSlice.reducer
    }
})