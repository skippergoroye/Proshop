import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'



const initialState = {
    order: {}
}



export const orderSlice = createSlice ({
    name: 'order',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
         addCase(order.pending, (state) => {
            state.loading = true
         })
         addCase(order)
          
    }
})