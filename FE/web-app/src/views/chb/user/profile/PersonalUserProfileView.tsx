// project
import {Box, Button, CardActions, CardContent, Chip, Divider, Grid, Modal, Tab, Tabs, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {convertImageToBase64, getUserProfile64Data} from "../../../../utils/UserProfileUtils";
import MainCard from "../../../../ui-component/cards/MainCard";
import {gridSpacing} from "../../../../store/constant";
import UserProfile from "./ProfileView";
import ChangePassword from "../../../application/users/account-profile/Profile2/ChangePassword";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import {useTheme} from "@mui/material/styles";
import Avatar from "../../../../ui-component/extended/Avatar";
import {getCookie} from "../../../../utils/CookieUtils";
import ProfileModalView from "views/chb/user/profile/ProfileModalView";

// assets
import './user-profile-style.scss';
import UserInfoContext from "../../provider/UserInfoProvider";

// ==============================|| PERSONAL USER PROFILE VIEW ||============================== //
const PersonalUserProfileView = () => {

    const userInfo = useContext(UserInfoContext);

    const theme = useTheme();

    const [currentUserId, setCurrentUserId] = useState(userInfo?.userId || null);
    const [loginUserProfile, setLoginUserProfile] = useState<string | undefined>(getUserProfile64Data() || '');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isUpdateProfile, setIsUpdateProfile] = useState<boolean>(false);


    useEffect(() => {
        setLoginUserProfile(getUserProfile64Data());
        setIsUpdateProfile(false);
    }, [isUpdateProfile]);

    return (
        <Grid>
            <Grid item xs={12}>
                <MainCard title="프로필 설정" content={false}>
                    <Grid container >
                        <Grid item xs={12} lg={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardContent onClick={() => setIsModalOpen(true) } >
                                <Grid className={`user-profile-back hover-color`}>
                                    <Avatar alt="User 1" size='customXxl' src={ loginUserProfile } />
                                </Grid>
                            </CardContent>
                            <ProfileModalView
                                setIsUpdateProfile = { setIsUpdateProfile }
                                isModalOpen={ isModalOpen }
                                setIsModalOpen={ setIsModalOpen }
                            />
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <CardContent
                                sx={{
                                    borderLeft: '1px solid',
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[200],
                                    height: '100%'
                                }}
                            >
                                    <UserProfile />
                            </CardContent>
                        </Grid>
                    </Grid>
                    <Divider />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default PersonalUserProfileView;