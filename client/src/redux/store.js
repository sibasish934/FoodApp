import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./reducers/authReducers";
import { cartReducers } from "./reducers/cartReducers";
import {orderReducer, ordersReducer} from "./reducers/ordersReducers";
import { adminReducer } from "./reducers/adminReducers";


const store = configureStore({
    reducer:{
        auth:authReducer,
        cart:cartReducers,
        order:orderReducer,
        orders: ordersReducer,
        admin: adminReducer
    },
})

export default store;

export const backend_url = "http://localhost:4000/api/v1";