// material-ui
import {Box, Typography} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import CoupleProfileElement from "./CoupleProfileElement";
import React, {useState} from "react";
import {getCookie} from "../../../utils/CookieUtils";
import JWTContext from "../../../contexts/JWTContext";
import UserProfile from "../../application/users/account-profile/Profile2/UserProfile";
import ProfileView from "../user/profile/ProfileView";

// ==============================|| SAMPLE PAGE ||============================== //

const CoupleProfilePage = () => {

    // [[ ===================== useContext ===================== ]]
    const userInfo = React.useContext(JWTContext)?.userInfoData;

    // [[ ===================== useState ===================== ]]
    const [isAvailableId, setIsAvailableId] = React.useState(false);
    const [currentUserId, setCurrentUserId] = useState(getCookie('jwt', 'sub'));
    const [findOtherUser, setFindOtherUser] = useState<boolean>(false);
    const [appliedCoupleAccount, setAppliedCoupleAccount] = useState(userInfo?.appliedCoupleAccount);
    const [otherUserProfile, setOtherUserProfile] = useState('');



    return (
        <MainCard title="커플 프로필">
            <CoupleProfileElement
                currentUserId={ currentUserId }
                findOtherUser={ findOtherUser }
                isAvailableId={ isAvailableId }
                appliedCoupleAccount={ appliedCoupleAccount }
                otherUserProfile={ otherUserProfile }
                onUpdateFindOtherUser={ setFindOtherUser }
                onUpdateIsAvailableId={ setIsAvailableId }
                onUpdateOtherUserProfile={ setOtherUserProfile }
            />
            <Box style={{ display: 'flex', marginTop: '3%' }}>
                <ProfileView
                    isForOtherUser={ false }
                />
                <ProfileView
                    isForOtherUser={ true }
                />
            </Box>
        </MainCard>
    )
};

export default CoupleProfilePage;
