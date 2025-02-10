import { createSlice } from "@reduxjs/toolkit";
import { TLoading, TStudent, isString } from "@/types";
import getStudents from "./actions/getStudents";
import addStudent from "./actions/addStudent";
import getStudentById from "./actions/getStudentById";
import updateStudent from "./actions/updateStudent";
import deleteStudent from "./actions/deleteStudent";

interface IStudentState {
  get: {
    loading: TLoading;
    error: string | null;
  };
  add: {
    loading: TLoading;
    error: string | null;
  };
  getById: {
    loading: TLoading;
    error: string | null;
  };
  edit: {
    loading: TLoading;
    error: string | null;
  };
  delete: {
    loading: TLoading;
    error: string | null;
  };
  records: TStudent[];
  student: TStudent | null;
  message: string | null;
}

const initialState: IStudentState = {
  get: {
    loading: "idle",
    error: null,
  },
  add: {
    loading: "idle",
    error: null,
  },
  getById: {
    loading: "idle",
    error: null,
  },
  edit: {
    loading: "idle",
    error: null,
  },
  delete: {
    loading: "idle",
    error: null,
  },
  records: [],
  student: null,
  message: null,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    studentsCleanUP: (state) => {
      state.records = [];
      state.message = null;
    },
    studentCleanUP: (state) => {
      state.student = null;
    },
  },
  extraReducers: (builder) => {
    // Get Students
    builder.addCase(getStudents.pending, (state) => {
      state.get.loading = "pending";
      state.get.error = null;
    });
    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.get.loading = "successed";
      state.records = action.payload;
    });
    builder.addCase(getStudents.rejected, (state, action) => {
      state.get.loading = "failed";
      if (isString(action.payload)) state.get.error = action.payload;
    });

    // Add Student
    builder.addCase(addStudent.pending, (state) => {
      state.add.loading = "pending";
      state.add.error = null;
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.add.loading = "successed";
      state.message = action.payload.message;
    });
    builder.addCase(addStudent.rejected, (state, action) => {
      state.add.loading = "failed";
      if (isString(action.payload)) state.add.error = action.payload;
    });

    // Get Student By Id
    builder.addCase(getStudentById.pending, (state) => {
      state.getById.loading = "pending";
      state.getById.error = null;
    });
    builder.addCase(getStudentById.fulfilled, (state, action) => {
      state.getById.loading = "successed";
      state.student = action.payload.data;
      state.message = action.payload.message;
    });
    builder.addCase(getStudentById.rejected, (state, action) => {
      state.getById.loading = "failed";
      if (isString(action.payload)) state.getById.error = action.payload;
    });

    // Update Student
    builder.addCase(updateStudent.pending, (state) => {
      state.edit.loading = "pending";
      state.edit.error = null;
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      state.edit.loading = "successed";
      state.message = action.payload.message;
    });
    builder.addCase(updateStudent.rejected, (state, action) => {
      state.edit.loading = "failed";
      if (isString(action.payload)) state.edit.error = action.payload;
    });

    // Delete Student
    builder.addCase(deleteStudent.pending, (state) => {
      state.delete.loading = "pending";
      state.delete.error = null;
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.delete.loading = "successed";
      state.message = action.payload.message;
      state.records = state.records.filter((record) => {
        return record.id !== action.payload.id;
      });
    });
    builder.addCase(deleteStudent.rejected, (state, action) => {
      state.delete.loading = "failed";
      if (isString(action.payload)) state.delete.error = action.payload;
    });
  },
});

export {
  getStudents,
  addStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
export const { studentsCleanUP, studentCleanUP } = studentsSlice.actions;
export default studentsSlice.reducer;
