import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productSlice.js'
import productReducer from '../features/products/productSlice.js'


export const store = configureStore ({
    reducer: {
        products: productsReducer,
        product: productReducer
    }
})
