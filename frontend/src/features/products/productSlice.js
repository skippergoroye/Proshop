import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";


const token = localStorage.getItem("token")

const initialState = {
    products: [],
    product: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    success: "",
    token: token ? token : ""
};



export const getProducts = createAsyncThunk(
  "products/getproducts",
  async (thunkAPI) => {
    try {
      return await productService.getAllProducts();
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



export const getSingleProducts = createAsyncThunk(
  "products/getSingleProducts",
  async (productId, thunkAPI) => {
    try {
      return await productService.getSingleProducts(productId);
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




export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        reset: (state)=> initialState
    },
    extraReducers: (builder)=>{
        builder
            .addCase(getProducts.pending, (state) => {
              state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })

            
            .addCase(getSingleProducts.pending, (state)=>{
                state.isLoading = true
              })
              .addCase(getSingleProducts.fulfilled, (state, action)=>{
                  state.isLoading = false
                  state.isError = false
                  state.isSuccess = true
                  state.product = action.payload
              })
            .addCase(getSingleProducts.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
    }
})


export const { reset } = productsSlice.actions

export default productsSlice.reducer