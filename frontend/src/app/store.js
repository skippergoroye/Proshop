import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productSlice'
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'
import userLoginReducer from '../features/auth/authSlice' 
import userRegisterReducer from '../features/auth/authSlice'
import userDetailsReducer from '../features/auth/authSlice'
import userUpdateProfileReducer from '../features/auth/authSlice' 


export const store = configureStore ({
    reducer: {
        products: productsReducer,
        product: productReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer
    }
})
