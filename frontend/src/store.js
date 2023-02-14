import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunck from 'redux-thunck'
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension'
import { productListReducer } from './reducers/productReducers.js'

import { cartReducer } from './reducers/cartReducers.js'


const reducer = combineReducers({
    productList: productListReducer,
    cart: cartReducer,
})


const initialState = {}

const middleware = [thunck]


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store



