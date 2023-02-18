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
};


// Register
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
  try {
     return await authService.register(user)
  } catch (error) {
    const message =
    (error.response && error.response.data && error.response.data.message) 
    || error.message 
    || error.toString();
  return thunkAPI.rejectWithValue(message);
  }
  // console.log(user);
})





// Login
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





// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
   await authService.logout()
})





export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
       // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userInfo = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.userInfo = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
