import {createReducer} from "@reduxjs/toolkit";

export const adminReducer = createReducer({
    orders:[], user:[]
}, {
    getDashboardStatsRequest : (state) =>{
        state.loading=true
    },
    getDashboardStatsSuccess: (state, action)=>{
        state.loading = false
        state.userCount = action.payload.userCount;
        state.ordersCount = action.payload.ordersCount;
        state.amount = action.payload.amount;
    },
    getDashboardStatsFail :(state, action) =>{
        state.loading = false
        state.error = action.payload
    },
    getAdminUsersRequest : (state) =>{
        state.loading= true
    },
    getAdminUsersSuccess: (state, action)=>{
        state.loading = true
        state.user = action.payload
    },
    getAdminUsersFail :(state, action) =>{
        state.loading = false
        state.error = action.payload
    },
    getAdminOrdersRequest : (state) =>{
        state.loading=true
    },
    getAdminOrdersSuccess: (state, action)=>{
        state.loading = false
        state.orders = action.payload
    },
    getAdminOrdersFail :(state, action) =>{
        state.loading = false
        state.error = action.payload
    }
})
