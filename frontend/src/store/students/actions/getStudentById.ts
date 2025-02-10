import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseURL from "@/apis/BaseURL";
import { axiosErrorHandler } from "@/utils";
import { RootState } from "@/store";
import { TStudent } from "@/types";

type TResponse = TStudent[];

const getStudentById = createAsyncThunk(
  "auth/getStudentById",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const student = await BaseURL.get<TResponse>(
        `/students?userId=${auth.user?.id}&id=${id}`,
        { signal } // abort request
      );

      if (!student.data.length) {
        return { data: null, message: "not_exist" };
      } else {
        return { data: student.data[0], message: "success" };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default getStudentById;
