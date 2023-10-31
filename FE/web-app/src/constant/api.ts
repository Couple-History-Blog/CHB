import axios from 'utils/axios';
import { SIGN_IN, CURRENT_USER_INFO } from './ApiUrls';

export const signInAsync = async (params: any) => {
    return axios.post(SIGN_IN, null, { params });
}

export const userInfoAsync = async (params: any) => {
    const data = { userJwtToken: params.serviceToken };
    return axios.get(CURRENT_USER_INFO, { params: data });
}
