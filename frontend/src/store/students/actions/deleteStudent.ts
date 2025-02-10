import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseURL from "@/apis/BaseURL";
import { axiosErrorHandler } from "@/utils";
import { RootState } from "@/store";
import { TStudent } from "@/types";

type TResponse = TStudent[];

const deleteStudent = createAsyncThunk(
  "auth/deleteStudent",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const isStudentExists = await BaseURL.get<TResponse>(
        `/students?userId=${auth.user?.id}&id=${id}`
      );

      if (!isStudentExists.data.length) {
        return { message: "not_exist" };
      } else {
        await BaseURL.delete(`/students/${isStudentExists.data[0].id}`);
        return { message: "success", id };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default deleteStudent;
