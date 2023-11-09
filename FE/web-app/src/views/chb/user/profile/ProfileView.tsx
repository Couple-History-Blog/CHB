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
import React, {useState} from "react";

import {getCookie} from "../../../../utils/CookieUtils";


const Profile = () => {

    // [[ ===================== useState ===================== ]]
    const [currentUserId, setCurrentUserId] = useState(getCookie('jwt', 'sub'));
    const [currentUserNickName, setCurrentUserNickName] = useState(getCookie('jwt', 'userNickName'));
    const [currentUserName, setCurrentUserName] = useState(getCookie('jwt', 'userName'));

    const [pictures, setPictures] = useState([]);


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
                                    { currentUserName }
                                </Typography>
                                <Typography align="left" style={{ fontSize: '15px' }} variant="subtitle2">
                                    { currentUserNickName }
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
                                    이것은 아이디
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
                                    이것은 메일
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
                                    이것은 생일
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