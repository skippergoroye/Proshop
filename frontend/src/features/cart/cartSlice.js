import { createSlice } from "@reduxjs/toolkit";
// import cartService from "./cartService";


const cartItemsFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];


  const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};


const initialState = {
  cart: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
};


export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    reset: (state) => initialState,
      addItem: (state, action) => {
        if (state.cart.length === 0) {
          state.cart = [...state.cart, action.payload];
          localStorage.setItem('cart', JSON.stringify(state.cart))
        } else if (state.cart.length > 0) {
          const product = action.payload;
          const findItem = state.cart.find((item) => item._id === product._id);
          if (!findItem) {
            state.cart = [...state.cart, action.payload];
            localStorage.setItem('cart', JSON.stringify(state.cart))
          }
        }
      },
      removeItem: (state, action) => {
        console.log(action)
        const itemId = action.payload
        state.cart = state.cart.filter((item) => item._id !== itemId);
        localStorage.setItem('cart', JSON.stringify(state.cart))
      },

      saveShippingAddress: (state, action, data) => {
        console.log(action)
        const itemId = action.payload
        localStorage.setItem('shippingAddress', JSON.stringify(data))
      },
    },
  extraReducers: (builder) => {
    
  },
});

export const { reset, addItem, removeItem, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;
