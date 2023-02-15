import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

// const token = localStorage.getItem("token")

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []


const initialState = {
    cart: {cartItems: cartItemsFromStorage },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    success: "",
    token: cartItemsFromStorage ? cartItemsFromStorage : ""
};




export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (cartId, thunkAPI) => {
      try {
        return await cartService.addToCart(cartId);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );




export const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        reset: (state)=> initialState
    },
    extraReducers: (builder)=>{
        builder
            .addCase(addToCart.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(addToCart.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(addToCart.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.cart = action.payload
            })
    }
})


export const { reset } = cartSlice.actions

export default cartSlice.reducer




