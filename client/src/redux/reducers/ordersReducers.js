import {createReducer} from "@reduxjs/toolkit";

export const orderReducer = createReducer({}, {
    createOrderRequest: (state)=>{
        state.loading = true
    },
    createOrderSuccess: (state, action) =>{
        state.loading = false
        state.message = action.payload
    },
    createOrderFail:(state, action) =>{
        state.loading=false
        state.error = action.payload
    },
    paymentRequest: (state)=>{
        state.loading = true
    },
    paymentSuccess: (state, action) =>{
        state.loading = false
        state.message = action.payload
    },
    paymentFail:(state, action) =>{
        state.loading=false
        state.error = action.payload
    },
    clearMessage:(state)=>{
        state.message = null;
    },
    clearError:(state)=>{
        state.error=null;
    }
});

export const ordersReducer = createReducer({
    orders: [],
}, {
    getMyOrdersRequest: (state) =>{
        state.loading=true;
    },
    getMyOrdersSuccess: (state, action)=>{
        state.loading=false;
        state.orders = action.payload;
    },
    getMyOrdersFail: (state, action)=>{
        state.loading=false
        state.error= action.payload
    },
    getMyOrdersDetailsRequest: (state) =>{
        state.loading=true;
    },
    getMyOrdersDetailsSuccess: (state, action)=>{
        state.loading=false;
        state.order = action.payload;
    },
    getMyOrdersDetailsFail: (state, action)=>{
        state.loading=false
        state.error= action.payload
    },
    clearError:(state)=>{
        state.error = null;
    },
    clearMessage:(state)=>{
        state.error = null;
    }
})