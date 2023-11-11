import {KeyedObject} from "../types";
import jwtDecode from "jwt-decode";

export const decodeJwtToken = (serviceToken: string): KeyedObject => {
    return jwtDecode(serviceToken);
}

export const loadLoginUserInfoData = () => {
    return {
        userId: getCookie("jwt", "sub"),
        userNickName: getCookie("jwt", "userNickName"),
        userName: getCookie("jwt", "userName"),
        userEmail: getCookie("jwt", "userEmail"),
        userBirthDate: getCookie("jwt", "userBirthDate"),
        updateProfile: false,
        appliedCoupleAccount: getCookie('jwt', 'appliedCoupleAccount'),
        ownUserAcceptYn: getCookie('jwt', 'ownUserAcceptYn'),
        beCoupleYn: getCookie('jwt', 'beCoupleYn'),
    };
}

export const getJwtFromCookie = () => {
    const jwtToken = getCookie('jwt');
    return jwtToken ? jwtToken : null;
}

export const verifyToken: (st: string | null) => boolean = (serviceToken) => {
    if (!serviceToken) return false;
    const decoded = decodeJwtToken(serviceToken);
    return decoded.exp > Date.now() / 1000;
};

export const getCookie = (cookieName: string, dataName?: string) => {
    const cookie = document.cookie.split('; ')
        .find(cookie => cookie.startsWith(`${cookieName}=`))
        ?.split('=')[1];
    if (cookieName === 'jwt' && cookie && dataName) {
        const decode = decodeJwtToken(cookie);
        if (dataName) return decode[dataName];
        return decode;
    }
    return cookie;
}

export const setCookie = (cookieName: string, cookieValue: any) => {
    document.cookie = `${cookieName}=${cookieValue}; secure`;
}

export const removeCookie = (cookieName: string) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}