import {createReducer} from "@reduxjs/toolkit";

const intitialState = {
    cartItems:localStorage.getItem("OrderItems") ? JSON.parse(localStorage.getItem("OrderItems")) : {
        cheeseBurger:{
            quantity: 0,
            price:300,
        },
        VegCheeseBurger:{
            quantity: 0,
            price:500,
        },
        BurgerWithFries:{
            quantity: 0,
            price:1800,
        },
    },
    subTotal : localStorage.getItem("cart Price")? JSON.parse(localStorage.getItem("cart Price")).subTotal : 0,
    tax : localStorage.getItem("cart Price")? JSON.parse(localStorage.getItem("cart Price")).tax : 0,
    shippingCharges : localStorage.getItem("cart Price")? JSON.parse(localStorage.getItem("cart Price")).shippingCharges : 0,
    total :localStorage.getItem("cart Price")? JSON.parse(localStorage.getItem("cart Price")).total : 0,
    shippingInfo:localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")):{},
}

export const cartReducers = createReducer(intitialState, {
    cheeseBurgerIncrement : (state)=>{
        state.cartItems.cheeseBurger.quantity += 1;
    },
    VegCheeseBurgerIncrement : (state)=>{
        state.cartItems.VegCheeseBurger.quantity += 1;
    },
    BurgerWithFriesIncrement : (state)=>{
        state.cartItems.BurgerWithFries.quantity += 1;
    },

    cheeseBurgerDecrement : (state)=>{
        state.cartItems.cheeseBurger.quantity -= 1;
    },
    VegCheeseBurgerDecrement : (state)=>{
        state.cartItems.VegCheeseBurger.quantity -= 1;
    },
    BurgerWithFriesDecrement : (state)=>{
        state.cartItems.BurgerWithFries.quantity -= 1;
    },

    calculatePrice:(state)=>{
        state.subTotal = state.cartItems.cheeseBurger.price * state.cartItems.cheeseBurger.quantity + state.cartItems.VegCheeseBurger.price * state.cartItems.VegCheeseBurger.quantity + state.cartItems.BurgerWithFries.price * state.cartItems.BurgerWithFries.quantity;

        state.tax = state.subTotal * 0.12;
        state.shippingCharges = 400;
        state.total = state.subTotal + state.tax + state.shippingCharges;
    },

    emptyState: (state) => {
        state.cartItems = {
          cheeseBurger: {
            quantity: 0,
            price: 200,
          },
          VegCheeseBurger: {
            quantity: 0,
            price: 500,
          },
          BurgerWithFries: {
            quantity: 0,
            price: 1800,
          },
        };
    
        state.subTotal = 0;
        state.shippingCharges = 0;
        state.tax = 0;
        state.total = 0;
      },
      addShippingInfo:(state, action)=>{
            state.shippingInfo= {
                hno:action.payload.hno,
                city:action.payload.city,
                Country:action.payload.Country,
                state:action.payload.state,
                pinCode:action.payload.pinCode,
                phoneNo:action.payload.phoneNo,
            }
      }

})

