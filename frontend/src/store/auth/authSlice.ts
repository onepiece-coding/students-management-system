import { createSlice } from "@reduxjs/toolkit";
import { TLoading, isString } from "@/types";
import authRegister from "./actions/authRegister";
import authLogin from "./actions/authLogin";

interface IAuthState {
  loading: TLoading;
  error: string | null;
  accessToken: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

const initialState: IAuthState = {
  loading: "idle",
  error: null,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cleanUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    authLogout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(authRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(authRegister.fulfilled, (state) => {
      state.loading = "successed";
    });
    builder.addCase(authRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // Login
    builder.addCase(authLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.loading = "successed";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export { authRegister, authLogin };
export const { cleanUI, authLogout } = authSlice.actions;
export default authSlice.reducer;
