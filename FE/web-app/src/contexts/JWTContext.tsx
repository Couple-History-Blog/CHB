import React, {createContext, useEffect, useReducer } from 'react';

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
    WEB_TYPE_ALERT
} from 'store/actions';
import {BASE_PATH} from '../config';
import accountReducer from 'store/accountReducer';
import { showErrorAlert, showSuccessAlert} from '../store/slices/alert'; // Redux Toolkit의 알림 액션 import 추가


// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';


// types
import {KeyedObject} from 'types';
import {InitialLoginContextProps, JWTContextType} from 'types/auth';
import ko from "../assets/language/ko.json";
import {signInAsync, userInfoAsync} from '../constant/api';
import {useDispatch, useSelector} from 'react-redux';
import {errorSweetAlert, successSweetAlert} from "../utils/alertUtil";


const KOR_LOGIN_MESSAGE = ko['sign-in'];
const KOR_LOGOUT_MESSAGE = ko['sign-out'];
const KOR_SERVER_MESSAGE = ko['server'];
const KOR_WEB_MESSAGE = ko['web'];
const chance = new Chance();


// constant
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken: (st: string | null) => boolean = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded: KeyedObject = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
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
    localStorage.setItem('userId', userInfo.sub);
    localStorage.setItem('userRoles', userInfo.roles);
}

const removeUserLocalStorage = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRoles');
}

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const dispatchAlert = useDispatch(); // Redux Toolkit의 디스패치 함수
    // @ts-ignore
    const alertState = useSelector((state) => state.alert); // Redux Toolkit의 알림 상태

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
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user
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
                removeUserLocalStorage();
                console.log("!!!! ERR !!!!! --> ", err)
                /*                const beforePath = window.location.pathname;
                                if (beforePath !== BASE_PATH + '/login') {
                                    dispatchAlert(
                                        showErrorAlert({
                                            errorMessage: KOR_WEB_MESSAGE.authorityPage,
                                            alertType: WEB_TYPE_ALERT
                                        })
                                    );
                                }*/
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
    }, [alertState.showErrorAlert, alertState.showSuccessAlert, alertState.errorMessage, alertState.alertType]);

    const login = async (userId: string, userPassword: string) => {

        try {
            const response = await signInAsync({userId, userPassword});
            const {accessToken, user} = response.data;
            setSession(accessToken);
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user
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

    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        // todo: this flow need to be recode as it not verified
        /*        const body = {
                    userId: userId,
                    userPassword: userPassword
                };
                try {
                    const response = await axios.post(saveUrl.signIn, JSON.stringify(body));
                } catch (error) {
                    console.log('ERR : ', error);
                    throw error;
                }*/

        const id = chance.bb_pin();
        const response = await axios.post('/chb/sign-up', {
            id,
            email,
            password,
            firstName,
            lastName
        });
        let users = response.data;

        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users');
            users = [
                ...JSON.parse(localUsers!),
                {
                    id,
                    email,
                    password,
                    name: `${firstName} ${lastName}`
                }
            ];
        }

        window.localStorage.setItem('users', JSON.stringify(users));
    };

    const logout = () => {
        dispatchAlert(
            showSuccessAlert({
                successMessage: KOR_LOGOUT_MESSAGE.logOutSuccess,
                alertType: LOGOUT_TYPE_ALERT
            })
        );
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
        </JWTContext.Provider>
    );
    /*    return (
            <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
        );*/
};

export default JWTContext;
