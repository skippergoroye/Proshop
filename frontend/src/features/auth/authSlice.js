import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;


const initialState = {
  userInfo: userInfoFromStorage,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: '',
  userLogout: {},
};



export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
       return await authService.login(user)
    } catch (error) {
      const message =
      (error.response && error.response.data && error.response.data.message) 
      || error.message 
      || error.toString();
    return thunkAPI.rejectWithValue(message);
    }
    // console.log(user);
})



export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
     // added Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
