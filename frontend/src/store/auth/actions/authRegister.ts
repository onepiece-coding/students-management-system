import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseURL from "@/apis/BaseURL";
import { axiosErrorHandler } from "@/utils";

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await BaseURL.post("/register", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default authRegister;
