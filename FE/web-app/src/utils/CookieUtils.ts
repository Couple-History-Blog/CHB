import {KeyedObject} from "../types";
import jwtDecode from "jwt-decode";
import {ADMIN, COUPLE, USER} from "../routes/Roles";

export const decodeJwtToken = (serviceToken: string): KeyedObject => {
    return jwtDecode(serviceToken);
}

export const loadLoginUserInfoData = () => {
    const USER_ROLE = getCookie("jwt", "roles");
    return {
        userId: getCookie("jwt", "sub"),
        userNickName: getCookie("jwt", "userNickName"),
        userName: getCookie("jwt", "userName"),
        userRoles: USER_ROLE,
        userEmail: getCookie("jwt", "userEmail"),
        userBirthDate: getCookie("jwt", "userBirthDate"),
        updateProfile: false,
        appliedCoupleAccount: getCookie('jwt', 'appliedCoupleAccount'),
        ownUserAcceptYn: getCookie('jwt', 'ownUserAcceptYn'),
        beCoupleYn: getCookie('jwt', 'beCoupleYn'),
        isAdmin: USER_ROLE === ADMIN,
        isCouple: USER_ROLE === COUPLE,
        isUser: USER_ROLE === USER,
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
    let date = new Date();
    const oneHour = 1;
    date.setTime(date.getTime() + (oneHour * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `${cookieName}=${cookieValue}; secure${expires}`;
}

export const removeCookie = (cookieName: string) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}