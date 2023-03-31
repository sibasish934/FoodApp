import axios from "axios";
import {backend_url} from "../store";

export const loadUser = () => async (dispatch) =>{
    try {
        dispatch({
            type:"loadUserRequest"
        })

        const { data } = await axios.get(`${backend_url}/me`, {
           withCredentials:true,
        })

        dispatch({
            type:"loadUserSuccess",
            payload:data.user,
        })
    } catch (error) { 
        dispatch({
            type:"loadUserFail",
            payload:error.response.data.message,
        })
    }
}

export const logout = () => async (dispatch) =>{
    try {
        dispatch({
            type:"logoutUserRequest"
        })

        const { data } = await axios.get(`${backend_url}/logout`, {
           withCredentials:true,
        })
        
        dispatch({
            type:"logoutUserSuccess",
            payload:data.message,
        })
    } catch (error) { 
        dispatch({
            type:"logoutUserFail",
            payload:error.response.data.message,
        })
    }
}