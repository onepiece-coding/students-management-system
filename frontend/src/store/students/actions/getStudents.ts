import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseURL from "@/apis/BaseURL";
import { axiosErrorHandler } from "@/utils";
import { TStudent } from "@/types";
import { RootState } from "@/store";

type TResponse = TStudent[];

const getStudents = createAsyncThunk(
  "auth/getStudents",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const response = await BaseURL.get<TResponse>(
        `/students?userId=${auth.user?.id}`,
        { signal } // abort request
      );

      if (!response.data.length) {
        return fulfillWithValue([]);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default getStudents;
