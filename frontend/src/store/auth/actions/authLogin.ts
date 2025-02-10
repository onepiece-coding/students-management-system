import { createAsyncThunk } from "@reduxjs/toolkit";
import BaseURL from "@/apis/BaseURL";
import { axiosErrorHandler } from "@/utils";

type TFormData = {
  email: string;
  password: string;
};

type TResponse = {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await BaseURL.post<TResponse>("/login", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default authLogin;
