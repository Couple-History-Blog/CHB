import React, {createContext, useEffect, useReducer, useState} from 'react';

// third-party
import {Chance} from 'chance';
import jwtDecode from 'jwt-decode';
// reducer - state management
import {
    LOGIN,
    LOGIN_TYPE_ALERT,
    LOGOUT,
    LOGOUT_TYPE_ALERT,
    SERVER_TYPE_ALERT,
    SIGNUP_TYPE_ALERT,
    WEB_TYPE_ALERT
} from 'store/actions';
import {BASE_PATH} from '../config';
import accountReducer from 'store/accountReducer';
import {clearAlert, showErrorAlert, showSuccessAlert} from '../store/slices/alert'; // Redux Toolkit의 알림 액션 import 추가

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';
import Load from 'utils/loadUtil';
import {convertImageToBase64} from "../utils/UserProfileUtils";
import {
    setCookie,
    removeCookie,
    decodeJwtToken,
    getJwtFromCookie,
    verifyToken,
    loadLoginUserInfoData
} from 'utils/CookieUtils';

// types
import {KeyedObject} from 'types';
import {InitialLoginContextProps, JWTContextType} from 'types/auth';
import ko from "../assets/language/ko.json";
import {getUserProfileAsync, signInAsync, signUpAsync, userInfoAsync} from '../constant/api';
import {useDispatch, useSelector} from 'react-redux';
import {errorSweetAlert, successSweetAlert} from "../utils/alertUtil";
import {useNavigate} from "react-router-dom";



import express from "express";

const KOR_LOGIN_MESSAGE = ko['sign-in'];
const KOR_LOGOUT_MESSAGE = ko['sign-out'];
const KOR_SERVER_MESSAGE = ko['server'];
const KOR_VALID_MESSAGE = ko['valid'];
const KOR_WEB_MESSAGE = ko['web'];
const chance = new Chance();
const PROFILE_TYPE: string = "프로필 사진";

// constant
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    userInfoData: null
};

const setSession = (serviceToken?: string | null) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        // axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;  // jwt token 인증할 때 이거 때문에 제대로 안 됨.
        axios.defaults.headers.common.Authorization = `${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

const setUserInfoToLocalStorage = (userInfo: any) => {
    // localStorage.setItem('userId', userInfo.sub);
    // localStorage.setItem('userRoles', userInfo.roles);
}

const removeUserLocalStorage = () => {
    removeCookie('jwt');
    // localStorage.removeItem('userId');
    // localStorage.removeItem('userRoles');
}

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const dispatchAlert = useDispatch(); // Redux Toolkit의 디스패치 함수
    // @ts-ignore
    const alertState = useSelector((state) => state.alert); // Redux Toolkit의 알림 상태
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                const beforePath = window.location.pathname;
                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken);
                    const response = await userInfoAsync({serviceToken});         // 현재 로그인한 사용자 확인
                    const {user} = response.data;
                    setUserInfoToLocalStorage(response.data);
                    const userInfoData = loadLoginUserInfoData();
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user,
                            userInfoData,
                        }
                    });
                } else {
                    removeUserLocalStorage();
                    setSession(null);
                    if (beforePath !== BASE_PATH + '/login') {
                        dispatchAlert(
                            showErrorAlert({
                                errorMessage: KOR_WEB_MESSAGE.authorityPage,
                                alertType: WEB_TYPE_ALERT
                            })
                        );
                    }
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                // @ts-ignore
                let errMsg = err.message;
                if (err == 'Wrong Services') errMsg = KOR_SERVER_MESSAGE.serverConnectFail;

                removeUserLocalStorage();
                setSession(null);
                console.log("!!!! ERR !!!!! --> ", err)
                dispatchAlert(
                    showErrorAlert({
                        errorMessage: errMsg,
                        alertType: WEB_TYPE_ALERT
                    })
                );
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    useEffect(() => {
        if (alertState.showErrorAlert) {
            errorSweetAlert(alertState.errorMessage, alertState.alertType);
        }
        if (alertState.showSuccessAlert) {
            successSweetAlert(alertState.successMessage, alertState.alertType);
        }
        dispatchAlert(clearAlert());
    }, [alertState.showErrorAlert, alertState.showSuccessAlert, alertState.errorMessage, alertState.alertType]);

    const login = async (userId: string, userPassword: string) => {

        try {
            const response = await signInAsync({ userId, userPassword });
            const userProfileResponse = await getUserProfileAsync({ userId, PROFILE_TYPE });
            const {accessToken, user} = response.data;
            setCookie('jwt', accessToken);
            sessionStorage.setItem('userProfileImage', userProfileResponse.data);
            // @ts-ignore
            sessionStorage.setItem('userProfileImageType', userProfileResponse.headers['content-type']);
            setSession(accessToken);
            const userInfoData = loadLoginUserInfoData();
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user,
                    userInfoData,
                }
            });
            dispatchAlert(
                showSuccessAlert({
                    successMessage: KOR_LOGIN_MESSAGE.signInSuccess,
                    alertType: LOGIN_TYPE_ALERT
                })
            );
        } catch (error) {
            // @ts-ignore
            let errMsg = error.message;
            let errType = LOGIN_TYPE_ALERT;
            if (error == 'Wrong Services') {
                errMsg = KOR_SERVER_MESSAGE.serverConnectFail;
                errType = SERVER_TYPE_ALERT;
            }
            dispatchAlert(
                showErrorAlert({
                    errorMessage: errMsg,
                    alertType: errType
                })
            );
            // throw error;
        }
    };

    const register = async (isAvailableId: boolean, userId: string, sexType:string, birthDate: string, email: string, password: string, firstName: string, lastName: string, nickName: string) => {
        if (!isAvailableId) {
            dispatchAlert(showErrorAlert({errorMessage: KOR_VALID_MESSAGE.idCheckCanUse,
                alertType: SERVER_TYPE_ALERT}));
            return;
        }
        const id = chance.bb_pin();
        const userName = firstName + lastName;
        const body = {
            userId: userId,
            userPassword: password,
            userName: userName,
            userSexType: sexType,
            userNickName: nickName,
            userMail: email,
            userBrthDate: new Date(birthDate).toLocaleDateString('fr-CA')
        };
        const response = await signUpAsync(body).then();
        let users = response.data;

        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users');
            users = [
                ...JSON.parse(localUsers!),
                {
                    id,
                    email,
                    password,
                    name: `${userName}`
                }
            ];
        }

        window.localStorage.setItem('users', JSON.stringify(users));

        setIsLoading(true);
        setTimeout(() => {  // 로딩 구현
            setIsLoading(false);
            dispatchAlert(
                showSuccessAlert({
                    successMessage: KOR_LOGIN_MESSAGE.signUpSuccess,
                    alertType: SIGNUP_TYPE_ALERT
                })
            );
            navigate('/login', { replace: true });  // true는 뒤로가기 X
        }, 1500);
    };

    const logout = () => {
        dispatchAlert(
            showSuccessAlert({
                successMessage: KOR_LOGOUT_MESSAGE.logOutSuccess,
                alertType: LOGOUT_TYPE_ALERT
            })
        );
        removeUserLocalStorage();
        setSession(null);
        dispatch({type: LOGOUT});
    };

    const resetPassword = (email: string) => console.log(email);

    const updateProfile = () => {
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader/>;
    }

    return (
        <JWTContext.Provider value={{...state, login, logout, register, resetPassword, updateProfile}}>
            {children}
            <Load isLoading={isLoading} setIsLoading={setIsLoading} />
        </JWTContext.Provider>
    );
};

export default JWTContext;
