import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseURL from "@/apis/BaseURL";
import { axiosErrorHandler } from "@/utils";
import { RootState } from "@/store";

type TFormData = {
  reference: string;
  firstName: string;
  lastName: string;
  email: string;
};

const addStudent = createAsyncThunk(
  "auth/addStudent",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const isStudentExists = await BaseURL.get(
        `/students?userId=${auth.user?.id}&reference=${formData.reference}`
      );

      if (isStudentExists.data.length) {
        return { message: "already_exist" };
      } else {
        await BaseURL.post("/students", {
          ...formData,
          userId: auth.user?.id,
        });
        return { message: "added" };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default addStudent;
