import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import techposApi from "../../api/techposApi";
import { IUser } from "../../interfaces";
import { RootState } from "../store";

interface authState {
  user: IUser;
  isLoggedIn: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: "";
}

const initialState: authState = {
  user: {
    id: null,
    firstName: "",
    email: "",
    role: "",
    isEmailConfirmed: null,
  },
  isLoggedIn: false,
  isIdle: true,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

//async thunk to fetch user data
export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (thunkAPI) => {
    const response = await techposApi.get("/auth/check");
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    startFetching: (state) => {
      state.isIdle = false;
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.isLoading = true;
        state.isIdle = false;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      });
  },
});

export const { setCredentials, startFetching } = authSlice.actions;

export const selectIsIdle = (state: RootState) => state.auth.isIdle;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsError = (state: RootState) => state.auth.isError;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
