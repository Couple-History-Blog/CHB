import axios from 'utils/axios';
import {
    SIGN_IN,
    CURRENT_USER_INFO,
    SIGN_UP,
    CHECK_EXIST_USER,
    GET_CURRENT_USER_GENDER,
    APPLY_COUPLE_ACCOUNT, GET_USER_PROFILE, UPLOAD_PROFILE_IMAGE, ACCEPT_BE_COUPLE, GET_OTHER_USER_INFO
} from './ApiUrls';


// [[ ===================== POST ===================== ]]
export const signInAsync = async (params: any) => {
    return axios.post(SIGN_IN, null, { params });
}

export const signUpAsync = async (body: any) => {
    return axios.post(SIGN_UP,  body);
}

export const applyCoupleAccountAsync = async (body: any) => {
    return axios.post(APPLY_COUPLE_ACCOUNT, body);
}

export const saveUserProfileImageAsync = async (body: any) => {
    return axios.post(UPLOAD_PROFILE_IMAGE, body);
}

export const acceptForBeCoupleAsync = async (body: any) => {
    return axios.post(ACCEPT_BE_COUPLE, body);
}




// [[ ===================== GET ===================== ]]
export const userInfoAsync = async (param: any) => {
    const data = { userJwtToken: param.serviceToken };
    return axios.get(CURRENT_USER_INFO, { params: data });
}

export const checkExistUserAsync = async (param: any) => {
    const data = { userId: param.id };
    return axios.get(CHECK_EXIST_USER,  { params:data });
}

export const getCurrentUserGenderAsync = async (param: any) => {
    const data = { userId: param.currentUserId };
    return axios.get(GET_CURRENT_USER_GENDER, { params:data });
}

export const getUserProfileAsync = async (params: any) => {
    const data = { userId: params.userId, useOtherUserId: params.useOtherUserId }
    return axios.get(GET_USER_PROFILE, { params: data });
}

export const getOtherUserInfoAsync = async (param: any) => {
    const data = { userId: param.loginUserId };
    return axios.get(GET_OTHER_USER_INFO, { params: data });
}