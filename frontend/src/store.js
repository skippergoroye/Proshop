import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunck from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import  { productListReducer } from './reducers/productReducers.js'


const reducer = combineReducers({
    productList: productListReducer,
})

const initialState = {}

const middleware = [thunck]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

