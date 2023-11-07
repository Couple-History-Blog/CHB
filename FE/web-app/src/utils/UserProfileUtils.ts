// 이미지 데이터를 Base64 문자열로 변환하는 함수
import {getUserProfileAsync} from "../constant/api";
import {useState} from "react";
import {getCookie} from "./CookieUtils";

const PROFILE_TYPE: string = "프로필 사진";

let existLoginUserProfile: boolean = false;
let existOtherUserProfile: boolean = false;

let loginUserProfile: string | null = null;
let otherUserProfile: string | null = null;

let otherUserId: string | null = null;
// const [existLoginUserProfile, setExistLoginUserProfile] = useState(false);
// const [existOtherUserProfile, setExistOtherUserProfile] = useState(false);

// const [loginUserProfile, setLoginUserProfile] = useState<string | null>(null);
// const [otherUserProfile, setOtherUserProfile] = useState<string | null>(null);


export async function convertImageToBase64(userId: string | null, profileData?: string | null) {
    // const currentUserId = localStorage.getItem('userId');
    const currentUserId = getCookie('jwt', 'sub');

    let base64Image: string | null = '';
    if (userId && profileData) {
        existLoginUserProfile = true;
        loginUserProfile = profileData;
    } else if (userId && userId == currentUserId) {      // 로그인 사용자
        if (!existLoginUserProfile) {
            // const response = await getUserProfileAsync({userId, PROFILE_TYPE});
            // loginUserProfile = response.data;
            loginUserProfile = localStorage.getItem('userProfileImage');
            existLoginUserProfile = true;
        }
        base64Image = loginUserProfile;
    } else if (userId) {                            // 상대방 사용자
        if (otherUserId !== userId) {
            otherUserProfile = null;
            existOtherUserProfile = false;
        }
        if (!existOtherUserProfile) {
            const response = await getUserProfileAsync({userId, PROFILE_TYPE});
            otherUserProfile = response.data
            otherUserId = userId;
            existOtherUserProfile = true;
        }
        base64Image = otherUserProfile;
    }
    return `data:image/png;base64,${base64Image}`;
}

/*
export function convertImageToBase64(userId: string | null) {
    let base64Image: string | null = '';
    if (userId) getUserProfileToBase64(userId).then(res => base64Image = res);
    // @ts-ignore
    console.log("1: ", userId);
    // alert("1 : ", userId);
    return `data:image/png;base64,${base64Image}`;
}
*/

export function getUserProfileToBase64(userId: string) {
    // @ts-ignore
    console.log("2: ", userId);
    return getUserProfileAsync({userId, PROFILE_TYPE});
}
