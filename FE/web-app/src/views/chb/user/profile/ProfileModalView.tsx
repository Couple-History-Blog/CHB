// Project
import { Grid, IconButton, Link, Modal, Paper, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Avatar from "../../../../ui-component/extended/Avatar";

// assets
import './user-profile-style.scss';

// fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    fasXmark as closeIcon,
    fasFolderImage as folderImageIcon,
    fasTrashCan as trashCanIcon,
    fasFloppyDisk as saveIcon
} from 'utils/font-awesome/icons';
import {useDropzone} from "react-dropzone";
import {getCookie} from "../../../../utils/CookieUtils";
import {saveUserProfileImage} from "../../../../constant/api";
import {clearAlert, showErrorAlert, showSuccessAlert} from "../../../../store/slices/alert";
import {SERVER_TYPE_ALERT, SIGNUP_TYPE_ALERT, WEB_TYPE_ALERT} from "../../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {errorSweetAlert, successSweetAlert} from "../../../../utils/alertUtil";

interface ProfileModalProps {
    setIsUpdateProfile: (isUpdate: boolean) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const ProfileModalView: React.FC<ProfileModalProps> = ({ setIsUpdateProfile, isModalOpen, setIsModalOpen }) => {

    const [currentUserId, setCurrentUserId] = useState(getCookie('jwt', 'sub'));
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    // @ts-ignore
    const alertState = useSelector((state) => state.alert); // Redux Toolkit의 알림 상태
    const dispatchAlert = useDispatch(); // Redux Toolkit의 디스패치 함수

    useEffect(() => {
        if (alertState.showErrorAlert) {
            errorSweetAlert(alertState.errorMessage, alertState.alertType);
        }
        if (alertState.showSuccessAlert) {
            successSweetAlert(alertState.successMessage, alertState.alertType);
        }
        dispatchAlert(clearAlert());
    }, [alertState.showErrorAlert, alertState.showSuccessAlert, alertState.errorMessage, alertState.alertType]);



    const saveUserProfile = () => {
        const file = acceptedFiles[0];
        const imageName = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);

        let base64String: string | null = null;
        const imageType = file.type;
        reader.onload = (ev) => {
            // @ts-ignore
            base64String = ev.target.result.split(",")[1];

            const body = {
                userId: currentUserId,
                imageData: base64String,
                imageName: imageName,
                imageUsage: '프로필 사진'
            };

            saveUserProfileImage(body)
                .then(res => {
                    if (uploadedImage) {
                        setIsUpdateProfile(true);
                        sessionStorage.setItem('userProfileImage', base64String ? base64String : '');
                        sessionStorage.setItem('userProfileImageType', imageType);
                        dispatchAlert(
                            showSuccessAlert({
                                successMessage: res.data,
                                alertType: SERVER_TYPE_ALERT
                            })
                        );
                    }
                })
                .catch((err) => {
                    dispatchAlert(
                        showErrorAlert({
                            errorMessage: err,
                            alertType: SERVER_TYPE_ALERT
                        })
                    );
                });
        }
        reader.readAsDataURL(file);
    }


    const onDrop = (acceptedFiles: File[]) => {
        // 이미지를 업로드하는 API 엔드포인트에 요청을 보내기
        const file = acceptedFiles[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (ev) => {
            // @ts-ignore
            const base64String = ev.target.result.split(",")[1];
            const mimeType = file.type;
            const dataUrl = `data:${mimeType};base64,${base64String}`;
            setUploadedImage(dataUrl);
        }
    };
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
        onDrop,
        accept: {"image/*": []} // 이미지만 허용
    });


    return (
        <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        >
                <Grid className='profile-modal'>
                    <Grid className='modal-header' style={{ borderBottom: 'double' }}>
                        <Typography id="keep-mounted-modal-title" className='margin-header-text'>
                            프로필 변경
                        </Typography>
                        <FontAwesomeIcon
                            style={{ zIndex: '20' }}
                            className='close-btn'
                            icon={closeIcon}
                            onClick={() => setIsModalOpen(false)}
                            size="2xl"
                        />
                    </Grid>
                    <Grid className='modal-element'>
                        {!uploadedImage && (
                            <Grid item xs={12} sm={12} style={{height: '70%'}}>
                                <Paper elevation={3} className={`image-upload-space hover-color`}>
                                    <div {...getRootProps()} className='flex-direction-space'>
                                        <input {...getInputProps()} />
                                        <FontAwesomeIcon icon={folderImageIcon} size='2xl'/>
                                        <p>이미지를 업로드하려면 클릭하세요.</p>
                                    </div>
                                </Paper>
                            </Grid>
                        )}
                        {uploadedImage && (
                            <>
                                <Grid item xs={12} sm={12}
                                      style={{height: '70%', display: 'flex', justifyContent: 'center'}}>
                                    <Grid item xs={12} sm={6} className='image-upload-space'>
                                        <Avatar alt="User 1" size='customXl' src={uploadedImage}/>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <IconButton onClick={() => setUploadedImage(null)}>
                                        <FontAwesomeIcon icon={trashCanIcon} style={{color: '#f97676'}}/>
                                    </IconButton>
                                    <IconButton onClick={() => saveUserProfile()} style={{marginTop: '50%'}}>
                                        <FontAwesomeIcon icon={saveIcon} style={{color: '#6edd8a'}}/>
                                    </IconButton>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
        </Modal>
    );
};

export default ProfileModalView;