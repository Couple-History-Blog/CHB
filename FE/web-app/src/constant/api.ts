import axios from 'utils/axios';

const API_URL = {
    GET_SCHEDULE_LIST: '/api/schedule/',
    GET_SCHEDULE_LOG: '/api/schedule/log',
    GET_SCHEDULE_DETAIL: '/api/schedule/detail',
    RUN_SCHEDULE_DETAIL: '/api/schedule/detail/run',
    CANCEL_SCHEDULE_DETAIL: '/api/schedule/detail/cancel',
    GET_ERROR_LIST: '/api/error/',
    GET_ERROR_DETAIL_LIST: '/api/error/detail',
    SIGN_IN: '/sign-in',
    CURRENT_USER_INFO: '/current-user',
};

export const signInAsync = async (params: any) => {
    return axios.post(API_URL.SIGN_IN, null, { params });
}

export const userInfoAsync = async (params: any) => {
    const data = { userJwtToken: params.serviceToken };
    return axios.get(API_URL.CURRENT_USER_INFO, { params: data });
}
