// project
import {Box, Button, CardActions, CardContent, Divider, Grid, Modal, Tab, Tabs, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {convertImageToBase64} from "../../../../utils/UserProfileUtils";
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

// ==============================|| PERSONAL USER PROFILE VIEW ||============================== //
const PersonalUserProfileView = () => {

    const theme = useTheme();

    // const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId'));
    const [currentUserId, setCurrentUserId] = useState(getCookie('jwt', 'sub'));
    const [loginUserProfile, setLoginUserProfile] = useState<string | undefined>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const profile64Data = await convertImageToBase64(currentUserId);
                setLoginUserProfile(profile64Data);
            } catch (error) {
                alert("ERR");
            }
        };
        fetchProfileData();
    }, [currentUserId]);

    return (
        <Grid>
            <Grid item xs={12}>
                <MainCard title="프로필 설정" content={false}>
                    {/*<Grid container spacing={gridSpacing}>*/}
                    <Grid container >
                        <Grid item xs={12} lg={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardContent onClick={() => setIsModalOpen(true) }>
                                <Avatar alt="User 1" size='customXxl' src={ loginUserProfile } />
                            </CardContent>
                            <ProfileModalView
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