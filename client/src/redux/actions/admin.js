import { backend_url } from "../store";
import axios from "axios";

export const getOrdersDetails = () => async(dispatch) =>{
    try {
      dispatch({type: "getDashboardStatsRequest"});
      
      const { data } = await axios.get(
        `${backend_url}/admin/stats`, {
          withCredentials:true,
        });
  
        dispatch({type:"getDashboardStatsSuccess", payload:data});
  
    } catch (error) {
       dispatch({type:"getDashboardStatsFail", payload:error.response.data.message});
    }
  }

  
export const getAdminUsers = () => async(dispatch) =>{
    try {
      dispatch({type: "getAdminUsersRequest"});
      
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/admin/user`, {
          withCredentials:true,
        });
  
        dispatch({type:"getAdminUsersSuccess", payload:data.user});
  
    } catch (error) {
       dispatch({type:"getAdminUsersFail", payload:error.response.data.message});
    }
  }


  
export const getAdminOrders = () => async(dispatch) =>{
    try {
      dispatch({type: "getAdminOrdersRequest"});
      
      const { data } = await axios.get(
        `${backend_url}/Admin/Orders`, {
          withCredentials:true,
        });
  
        dispatch({type:"getAdminOrdersSuccess", payload:data.orders});
  
    } catch (error) {
       dispatch({type:"getAdminOrdersFail", payload:error.response.data.message});
    }
  }
  