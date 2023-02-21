import { createSlice } from "@reduxjs/toolkit";
// import cartService from "./cartService";


const cartItemsFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem('cart'))
  : [];


  const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

  // To get the payment type without Having to click it...... To save Payment type in local storage
  // const payFromStorage = localStorage.getItem("paymentMethod")
  // ? JSON.parse(localStorage.getItem('paymentMethod'))
  // : {};




const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  // paymentMethod: payFromStorage,
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
      saveShippingAddress: (state, action) => {
        console.log(action)
        const data = action.payload;
        state.shippingAddress = data;
        localStorage.setItem('shippingAddress', JSON.stringify(data))
      },
      savePaymentMethod: (state, action) => {
        console.log(action)
        const data = action.payload;
        state.paymentMethod = data;
        localStorage.setItem('paymentMethod', JSON.stringify(data))
      },
    },
  extraReducers: (builder) => {
    
  },
});

export const { reset, addItem, removeItem, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;
