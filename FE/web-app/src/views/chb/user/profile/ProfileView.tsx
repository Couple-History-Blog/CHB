import {
    CardContent,
    Chip, Divider,
    Grid, InputLabel,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText, Paper, TextField,
    Typography
} from "@mui/material";
import SubCard from "../../../../ui-component/cards/SubCard";
import Avatar from "../../../../ui-component/extended/Avatar";
import Avatar3 from "../../../../assets/images/users/avatar-3.png";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import PhonelinkRingTwoToneIcon from "@mui/icons-material/PhonelinkRingTwoTone";
import PinDropTwoToneIcon from "@mui/icons-material/PinDropTwoTone";
import { gridSpacing } from "../../../../store/constant";
import { convertImageToBase64 } from 'utils/UserProfileUtils';
import React, {useEffect, useState} from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import ImageUploader from "react-images-upload";
import axios from 'utils/axios';
import {useDropzone} from "react-dropzone";
import {getCookie} from "../../../../utils/CookieUtils";
import alert from "../../../../store/slices/alert";


// const Profile = (props: { loginUserProfile: string | undefined }) => {
const Profile = () => {

    // [[ ===================== useState ===================== ]]
    // const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId'));
    const [currentUserId, setCurrentUserId] = useState(getCookie('jwt', 'sub'));
    const [currentUserNickName, setCurrentUserNickName] = useState(getCookie('jwt', 'userNickName'));
    const [currentUserName, setCurrentUserName] = useState(getCookie('jwt', 'userName'));

    const [pictures, setPictures] = useState([]);


    // [[ ===================== useEffect ===================== ]]


    // [[ ===================== Function ===================== ]]
/*
    const onDrop = (picture: any) => {
        // @ts-ignore
        setPictures([...pictures, picture]);
    };
*/



    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const onDrop = (acceptedFiles: any) => {
        // 이미지를 업로드하는 API 엔드포인트에 요청을 보내기
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);
        // @ts-ignore
        formData.append("userId", currentUserId);
        axios
            .post("/upload-image", formData, )
            .then((response) => {
                // 성공적으로 업로드된 경우 이미지를 표시
                console.log(response);
                const mimeType = response.headers['content-type'];
                const base64String = response.data;
                const dataUrl = `data:${mimeType};base64,${base64String}`;
                console.log(dataUrl);
                // @ts-ignore
                setUploadedImage(dataUrl);
            })
            .catch((error) => {
                console.error("이미지 업로드 중 오류 발생:", error);
            });
    };
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop,
        accept: { "image/*": [] } // 이미지만 허용
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={16} xs={12}>
                <SubCard
                    title={
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
{/*
                                <ImageUploader
                                    withIcon={true}
                                    onChange={onDrop}
                                    withPreview={true}
                                    buttonText='이미지 업로드'
                                    imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
                                    maxFileSize={5242880}
                                />
*/}
{/*                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Paper elevation={3}>
                                            <div {...getRootProps()} style={{ padding: "20px", textAlign: "center" }}>
                                                <input {...getInputProps()} />
                                                <CloudUploadIcon style={{ fontSize: 80 }} />
                                                <p>이미지를 업로드하려면 클릭하세요.</p>
                                            </div>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {uploadedImage && (
                                            <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: "100%" }} />
                                        )}
                                    </Grid>
                                </Grid>*/}
                                {/*                            <TextField type="file" id="file-upload" fullWidth label="Enter SKU" sx={{ display: 'none' }} />
                            <InputLabel
                                htmlFor="file-upload"
                                sx={{
                                    // background: theme.palette.background.default,
                                    py: 3.75,
                                    px: 0,
                                    textAlign: 'center',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    mb: 3,
                                    '& > svg': {
                                        verticalAlign: 'sub',
                                        mr: 0.5
                                    }
                                }}
                            >
                                <Avatar alt="User 1" src={ props.loginUserProfile } />
                            </InputLabel>*/}
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