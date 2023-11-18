import {Grid} from "@mui/material";
import Avatar from "../../../ui-component/extended/Avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    fadCircleHeart as circleHeartIcon,
    fasUserHair as maleUserIcon,
    fasUserHairLong as femaleUserIcon
} from "../../../utils/font-awesome/icons";
import React, {useEffect, useState} from "react";
import {getUserProfile64Data} from "../../../utils/UserProfileUtils";
import {getCurrentUserGenderAsync, getUserProfileAsync} from "../../../constant/api";
import {showErrorAlert} from "../../../store/slices/alert";
import {WEB_TYPE_ALERT} from "../../../store/actions";
import {useDispatch} from "../../../store";
import koJson from "../../../assets/language/ko.json";
import JWTContext from "../../../contexts/JWTContext";


interface PropsCoupleProfile {
    currentUserId: string;
    appliedCoupleAccount: boolean | undefined;

    findOtherUser: boolean;
    isAvailableId: boolean;
    otherUserProfile: string;

    onUpdateFindOtherUser: (r: boolean) => void;
    onUpdateIsAvailableId: (r: boolean) => void;
    onUpdateOtherUserProfile: (r: string) => void;
}

const CoupleProfileElement: React.FC<PropsCoupleProfile> = ({currentUserId, findOtherUser, isAvailableId, appliedCoupleAccount,
                                                           otherUserProfile, onUpdateFindOtherUser, onUpdateIsAvailableId, onUpdateOtherUserProfile}) => {

    const userInfo = React.useContext(JWTContext)?.userInfoData;

    // [[ ===================== normal ===================== ]]
    const dispatchAlert = useDispatch(); // Redux Toolkit의 디스패치 함수
    const KOR_SERVER_MESSAGE = koJson['server'];

    // [[ ===================== useState ===================== ]]
    const [loginUserProfile, setLoginUserProfile] = useState(getUserProfile64Data() || '');
    const [userGender, setUserGender] = useState('');


    // [[ ===================== Function ===================== ]]
    async function fetchUserGender() {
        try {
            const response = await getCurrentUserGenderAsync({currentUserId});
            const currentUserGender = response.data;
            setUserGender(currentUserGender);
        } catch (err) {
            // @ts-ignore
            let errMsg = (err.message ?? err) === 'Wrong Services' ? KOR_SERVER_MESSAGE.serverConnectFail : err.message;
            dispatchAlert(showErrorAlert({
                errorMessage: errMsg,
                alertType: WEB_TYPE_ALERT
            }));
        }
    }

    async function getOtherUserProfile() {
        let userProfile = '';
        // 커플 계정 신청이 된 사용자 or 커플이면 상대방 프로필 가져옴
        if (appliedCoupleAccount || userInfo?.isCouple) {
            const useOtherUserId = true;
            const userId = currentUserId;
            const response = await getUserProfileAsync({ userId, useOtherUserId });

            const userProfileImage = response.data;
            const userProfileImageType = response.headers['content-type'];

            userProfile = getUserProfile64Data(userProfileImage, userProfileImageType);
            /* 자식 컴포넌트에서는 명명을 set~~로 하지 않아야 한다.
            * 자식은 데이터의 값만 변경하는 목적이고
            * set하는 작업은 부모가 해야 한다.
            */
            onUpdateFindOtherUser(true);
            onUpdateIsAvailableId(true);
/*
            setFindOtherUser(true);
            setIsAvailableId(true);
*/
        }
        onUpdateOtherUserProfile(userProfile);
        // setOtherUserProfile(userProfile);
    }

    // [[ ===================== useEffect ===================== ]]
    useEffect(() => {
        fetchUserGender();
        getOtherUserProfile();
    }, []);


    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item>
                <Avatar color='primary' alt="Avatar 1" src={loginUserProfile} size='customXl'/>
            </Grid>
            <Grid item>
                <FontAwesomeIcon icon={circleHeartIcon} size="2xl" className={'heart-style'}/>
            </Grid>
            <Grid item>
                {!findOtherUser && (
                    <>
                        {userGender === 'MALE' && (
                            <Avatar sx={{bgcolor: '#e1e1e1'}} size='customXl'>
                                <FontAwesomeIcon icon={femaleUserIcon} style={{fontSize: '140px', color: '#b26376'}}/>
                            </Avatar>
                        )}
                        {userGender === 'FEMALE' && (
                            <Avatar sx={{bgcolor: '#E0E0E0'}} size='customXl'>
                                <FontAwesomeIcon icon={maleUserIcon} style={{fontSize: '140px', color: '#1E3050'}}/>
                            </Avatar>
                        )}
                    </>
                )}
                {findOtherUser && isAvailableId && (
                    <Avatar alt="User 1" src={ otherUserProfile } size='customXl'/>
                )}
            </Grid>
        </Grid>

    );
}
export default CoupleProfileElement;