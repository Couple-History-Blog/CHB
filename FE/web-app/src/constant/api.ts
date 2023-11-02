import axios from 'utils/axios';
import {SIGN_IN, CURRENT_USER_INFO, SIGN_UP, CHECK_AVAILABLE_ID} from './ApiUrls';

export const signInAsync = async (params: any) => {
    return axios.post(SIGN_IN, null, { params });
}

export const signUpAsync = async (body: any) => {
    return axios.post(SIGN_UP,  body);
}

export const userInfoAsync = async (param: any) => {
    const data = { userJwtToken: param.serviceToken };
    return axios.get(CURRENT_USER_INFO, { params: data });
}

export const checkAvailableIdAsync = async (param: any) => {
    const data = { userId: param.id }
    return axios.get(CHECK_AVAILABLE_ID,  { params:data });
}