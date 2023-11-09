import React, {ReactNode, useState} from "react";
import {getCookie} from "../../../utils/CookieUtils";

const UserInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [userInfo, setUserInfo] = useState({
        userId: getCookie('jwt', 'sub'),
        loginUserProfile: '',
        userNickName: getCookie('jwt', 'userNickName'),
        userName: getCookie('jwt', 'userName'),
        userEmail: getCookie('jwt', 'userEmail'),
        userBirthDate: getCookie('jwt', 'userBirthDate'),
    });

    // set
/*
    setUserProfile((prevProfile) => ({
        ...prevProfile,
        userName: newUserName,
    }));
*/
    // get
    // const userName = userProfile.userName;

    const provideUserInfo = (child: React.ReactElement) => React.cloneElement(child, { userInfo, setUserInfo });

    return provideUserInfo(children as React.ReactElement<any, string | React.JSXElementConstructor<any>>);
}

export default UserInfoProvider;