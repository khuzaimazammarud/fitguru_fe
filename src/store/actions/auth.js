import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import setAuthToken from "../../utils/authToken";
import jwtDecode from "jwt-decode";

import { LOGIN } from "../../configs/urls";
import { SET_CURRENT_USER, SET_GOAL_DATA } from "../types";
import { ShowError } from "../../utils/flashMessages";

export const Init = () => async dispatch => {
    const token = await AsyncStorage.getItem('jwt-token');
    if (token !== null) {
        setAuthToken(token);
        const decode = jwtDecode(token);
        dispatch(setCurrentUser(decode));
    }
}

export const Singin = userData => async dispatch => {

    try {
        const response = await axios.post(LOGIN, userData);
        const token = response.data.token;
        await AsyncStorage.setItem('jwt-token', token);
        setAuthToken(token);
        const decode = jwtDecode(token);
        dispatch(setCurrentUser(decode, response.data.goal));
    } catch (error) {
        ShowError(error.response.data.message);
    }
}

const setCurrentUser = (decode, goal) => {
  return {
    type: SET_CURRENT_USER,
    payload: {
      ...decode,
      goal // this will add the goal to the payload
    }
  }
}

export const Signout = () => {
    return async dispath => {
        await AsyncStorage.clear();
        setAuthToken(false);
        dispath({
            type: 'LOGOUT',
            payload: null
        })
    }
}