import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseURL from "@/apis/BaseURL";
import { axiosErrorHandler } from "@/utils";
import { RootState } from "@/store";
import { TStudent } from "@/types";

type TFormData = {
  id: number;
  reference: string;
  firstName: string;
  lastName: string;
  email: string;
};

type TResponse = TStudent[];

const updateStudent = createAsyncThunk(
  "auth/updateStudent",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const isStudentExists = await BaseURL.get<TResponse>(
        `/students?userId=${auth.user?.id}&id=${formData.id}`
      );

      if (!isStudentExists.data.length) {
        return { message: "not_exist" };
      } else {
        await BaseURL.put(`/students/${isStudentExists.data[0].id}`, {
          ...formData,
          userId: auth.user?.id,
        });
        return { message: "edited" };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default updateStudent;
