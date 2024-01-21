import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../utils/Constants"

const initialState = {
    students: [],
    genderFilter: "All",
    sortBy: "Select",
    classFilter: "All",
    status: "idle",
    error: null
}

export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
    const response = await axios.get(`${BASE_URL}/students`)
    return response.data;
})

export const addStudentAsync = createAsyncThunk("students/addStudentAsync", async (newStudent) => {
    const response = await axios.post(`${BASE_URL}/students`, newStudent)
    return response.data;
})

export const updateStudentAsync = createAsyncThunk("students/updateStudentAsync", async ({ id, updatedStudent}) => {
    const response = await axios.post(`${BASE_URL}/students/${id}`, updatedStudent)
    return response.data.data
})

export const deleteStudentAsync = createAsyncThunk("students/deleteStudentAsync", async (id) => {
    const response = await axios.delete(`${BASE_URL}/students/${id}`)
    return response.data.student
})


export const studentsSlice = createSlice({
    name: "students", 
    initialState,
    reducers: {
        setGenderFilter: (state, action) => {
            state.genderFilter = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setClassFilter: (state, action) => {
            state.classFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.pending,  (state) => {
            state.status = "loading"
        }).addCase(fetchStudents.fulfilled, (state, action) => {
            state.status = "success";
            state.students = action.payload
        }).addCase(fetchStudents.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message
        }).addCase(addStudentAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(addStudentAsync.fulfilled, (state, action) => {
            state.status = "success";
            state.students.data.push(action.payload)
        }).addCase(addStudentAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        }).addCase(updateStudentAsync.pending, (state) => {
            state.status = "loading"
        }).addCase(updateStudentAsync.fulfilled, (state, action) => {
            state.status = "success";
            const updatedStudent = action.payload;
            const index = state?.students?.data?.findIndex((s) => s?._id === updatedStudent?._id)

            if(index !== -1){
                state.students.data[index] = updatedStudent
            }
        }).addCase(updateStudentAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        }).addCase(deleteStudentAsync.pending, (state) => {
            state.status = "loading";
          }).addCase(deleteStudentAsync.fulfilled, (state, action) => {
            state.status = "success";
            const deletedStudent = action.payload;
            state.students.data = state?.students?.data?.filter(
              (student) => student?._id !== deletedStudent?._id
            );
          }).addCase(deleteStudentAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
          }).addDefaultCase((state, action) => {})
    }
})

export const {
    setGenderFilter, 
    setSortBy,
    setClassFilter
} = studentsSlice.actions;

export default studentsSlice.reducer