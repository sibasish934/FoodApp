import { backend_url } from "../store";
import axios from "axios";

export const createOrder =
  (
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "createOrderRequest",
      });

      const { data } = await axios.post(
        `${backend_url}/createorder`,
        {
          shippingInfo,
          orderItems,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingCharges,
          totalAmount,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "createOrderSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "createOrderFail",
        payload: error.response.data.message,
      });
    }
  };

export const paymentVerification =
  (razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "paymentRequest",
      });

      const { data } = await axios.post(
        `${backend_url}/paymentVerify`,
        {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          orderOptions,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "paymentSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "paymentFail",
        payload: error.response.data.message,
      });
    }
  };



export const getOrders = () => async (dispatch) =>{
  try {
    dispatch({type: "getMyOrdersRequest"});
    
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/myOrders", {
        withCredentials:true,
      });

      dispatch({type:"getMyOrdersSuccess", payload:data.orders});

  } catch (error) {
     dispatch({type:"getMyOrdersFail", payload:error.response.data.message});
  }
}


export const getOrdersDetails = (id) => async(dispatch) =>{
  try {
    dispatch({type: "getMyOrdersDetailsRequest"});
    
    const { data } = await axios.get(
      `${backend_url}/orderDetails/${id}`, {
        withCredentials:true,
      });

      dispatch({type:"getMyOrdersDetailsSuccess", payload:data.order});

  } catch (error) {
     dispatch({type:"getMyOrdersDetailsFail", payload:error.response.data.message});
  }
}


