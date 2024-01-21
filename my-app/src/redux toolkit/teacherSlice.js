import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../utils/Constants"

const initialState = {
    teachers: [],
    status: "idle",
    error: null
}

export const fetchTeachers = createAsyncThunk(
    "teachers/fetchTeachers", async () => {
        const response = await axios.get(`${BASE_URL}/teachers`)
        return response.data
    }
)

export const addTeacherAsync = createAsyncThunk(
    "teachers/addTeacherAsync", async (teacherData) => {
        const response = await axios.post(`${BASE_URL}/teachers`, teacherData)
        return response.data;
    }
)

export const updateTeacherAsync = createAsyncThunk(
    "teachers/updateTeacherAsync", async ({ id, updatedTeacher}) => {
        const response = await axios.post(`${BASE_URL}/teachers/${id}`, updatedTeacher)
        return response.data
    }
)

export const deleteTeacherAsync = createAsyncThunk(
    "teachers/deleteTeacherAsync", async (id) => {
        const response = await axios.delete(`${BASE_URL}/teachers/${id}`)
        return response.data
    }
)


export const teacherSlice = createSlice({
    name: "teachers",
    initialState, 
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTeachers.pending, (state) => {
            state.status = "loading";
        }).addCase(fetchTeachers.fulfilled, (state, action) => {
            state.status = "success";
            state.teachers = action.payload;
          }).addCase(fetchTeachers.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
          }).addCase(addTeacherAsync.pending, (state) => {
            state.status = "loading";
          }).addCase(addTeacherAsync.fulfilled, (state, action) => {
            state.status = "success";
            state.teachers.push(action.payload);
          }).addCase(addTeacherAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
          }).addCase(updateTeacherAsync.pending, (state) => {
            state.status = "loading";
          }).addCase(updateTeacherAsync.fulfilled, (state, action) => {
            state.status = "success";
            const updatedTeacher = action.payload;
            const index = state.teachers.findIndex(
              (teacher) => teacher._id === updatedTeacher._id
            );
            if (index !== -1) {
              state.teachers[index] = updatedTeacher;
            }
          }).addCase(updateTeacherAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
          }).addCase(deleteTeacherAsync.pending, (state) => {
            state.status = "loading";
          }).addCase(deleteTeacherAsync.fulfilled, (state, action) => {
            state.status = "success";
            const deletedTeacher = action.payload;
            state.teachers = state.teachers.filter(
              (teacher) => teacher._id !== deletedTeacher._id
            );
          }).addCase(deleteTeacherAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
          }).addDefaultCase((state, action) => {})
    }
})


export default teacherSlice.reducer;
