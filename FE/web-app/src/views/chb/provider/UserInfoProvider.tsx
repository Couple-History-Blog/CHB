// set
/*
    setUserProfile((prevProfile) => ({
        ...prevProfile,
        userName: newUserName,
    }));
*/
// get
// const userName = userProfile.userName;


import React, {ReactNode, useState} from "react";
import {getCookie} from "../../../utils/CookieUtils";

interface UserInfo {
    userId: string;
    // loginUserProfile: string;
    userNickName: string;
    userName: string;
    userEmail: string;
    userBirthDate: string;
    updateProfile: boolean;
}

interface UserInfoProviderProps {
    children: ReactNode;
}

const UserInfoContext = React.createContext<UserInfo | undefined>(undefined);

export const UserInfoProvider: React.FC<UserInfoProviderProps> = ({children}) => {


    const [userInfo, setUserInfo] = useState<UserInfo>({
        userId: getCookie("jwt", "sub"),
        userNickName: getCookie("jwt", "userNickName"),
        userName: getCookie("jwt", "userName"),
        userEmail: getCookie("jwt", "userEmail"),
        userBirthDate: getCookie("jwt", "userBirthDate"),
        updateProfile: false,
    });

    return (
        <UserInfoContext.Provider value={ userInfo }>
            {children}
        </UserInfoContext.Provider>
    );
};

export default UserInfoContext;
