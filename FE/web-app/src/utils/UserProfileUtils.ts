// 이미지 데이터를 Base64 문자열로 변환하는 함수
import {getUserProfileAsync} from "../constant/api";
import {getCookie} from "./CookieUtils";

const PROFILE_TYPE: string = "프로필 사진";

let existLoginUserProfile: boolean = false;
let existOtherUserProfile: boolean = false;

let loginUserProfile: string | null = null;
let otherUserProfile: string | null = null;

let otherUserId: string | null = null;


export const getUserProfile64Data = (base64Image?: string | null, imageType?: string | null) => {
    if (!base64Image) base64Image = sessionStorage.getItem('userProfileImage');
    if (!imageType) imageType = sessionStorage.getItem('userProfileImageType');
    return `data:${imageType};base64,${base64Image}`;
}

export async function convertImageToBase64(userId: string | null, profileData?: string | null) {
    // const currentUserId = localStorage.getItem('userId');
    const currentUserId = getCookie('jwt', 'sub');

    let base64Image: string | null = '';
    if (userId && profileData) {
        existLoginUserProfile = true;
        loginUserProfile = profileData;
    } else if (userId && userId == currentUserId) {      // 로그인 사용자
        if (!existLoginUserProfile) {
            loginUserProfile = sessionStorage.getItem('userProfileImage');
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


export function getUserProfileToBase64(userId: string) {
    // @ts-ignore
    console.log("2: ", userId);
    return getUserProfileAsync({userId, PROFILE_TYPE});
}
