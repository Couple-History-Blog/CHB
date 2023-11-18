import {
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@mui/material";
import SubCard from "../../../../ui-component/cards/SubCard";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import PhonelinkRingTwoToneIcon from "@mui/icons-material/PhonelinkRingTwoTone";
import { gridSpacing } from "../../../../store/constant";
import React, {useContext, useEffect, useState} from "react";

import {decodeJwtToken, getCookie} from "../../../../utils/CookieUtils";
import JWTContext from "../../../../contexts/JWTContext";
import {useSelector} from "react-redux";


interface PropsUserCard {
    isForOtherUser: boolean;
}

const Profile: React.FC<PropsUserCard> = ({ isForOtherUser }) => {

    // [[ ===================== useContext ===================== ]]
    const userInfo = React.useContext(JWTContext)?.userInfoData;
    const otherUserInfo = React.useContext(JWTContext)?.otherUserInfoData;


    // [[ ===================== useState ===================== ]]
    const [currentUserId, setCurrentUserId] = useState(userInfo?.userId);
    const [currentUserMail, setCurrentUserMail] = useState(userInfo?.userEmail);
    const [currentUserNickName, setCurrentUserNickName] = useState(userInfo?.userNickName);
    const [currentUserName, setCurrentUserName] = useState(userInfo?.userName);
    const [currentUserBirthDate, setCurrentUserBirthDate] = useState(userInfo?.userBirthDate);

    const [otherUserId, setOtherUserId] = useState(otherUserInfo?.userId);
    const [otherUserMail, setOtherUserMail] = useState(otherUserInfo?.userEmail);
    const [otherUserNickName, setOtherUserNickName] = useState(otherUserInfo?.userNickName);
    const [otherUserName, setOtherUserName] = useState(otherUserInfo?.userName);
    const [otherUserBirthDate, setOtherUserBirthDate] = useState(otherUserInfo?.userBirthDate);

    const [pictures, setPictures] = useState([]);

    console.log("EE => ", otherUserInfo);

    // [[ ===================== useEffect ===================== ]]


    // [[ ===================== Function ===================== ]]
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={16} xs={12}>
                <SubCard
                    title={
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography align="left" style={{fontSize: '20px'}} variant="subtitle1">
                                    { isForOtherUser ? otherUserName : currentUserName }
                                </Typography>
                                <Typography align="left" style={{ fontSize: '15px' }} variant="subtitle2">
                                    { isForOtherUser ? otherUserNickName : currentUserNickName }
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                >
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItemButton>
                            <ListItemIcon>
                                <MailTwoToneIcon sx={{fontSize: '1.3rem'}}/>
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">아이디</Typography>}/>
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    { isForOtherUser ? otherUserId : currentUserId }
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <MailTwoToneIcon sx={{fontSize: '1.3rem'}}/>
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">이메일</Typography>}/>
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    { isForOtherUser ? otherUserMail : currentUserMail }
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <Divider/>
                        <ListItemButton>
                            <ListItemIcon>
                                <PhonelinkRingTwoToneIcon sx={{fontSize: '1.3rem'}}/>
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">생일</Typography>}/>
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    { isForOtherUser ? otherUserBirthDate : currentUserBirthDate }
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <Divider/>
                        <ListItemButton>
                            <ListItemIcon>
                                <PhonelinkRingTwoToneIcon sx={{fontSize: '1.3rem'}}/>
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">전화번호</Typography>}/>
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    이것은 전화번호
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    </List>
                </SubCard>
            </Grid>
        </Grid>
    )
}

export default Profile;