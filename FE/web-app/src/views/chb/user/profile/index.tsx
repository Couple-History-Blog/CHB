import React, {useEffect, useState} from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardActions, CardContent, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';

// project imports
// import UserProfile from 'views/application/users/account-profile/Profile2/UserProfile';
import UserProfile from './ProfileView';
import Billing from 'views/application/users/account-profile/Profile2/Billing';
import Payment from 'views/application/users/account-profile/Profile2/Payment';
import ChangePassword from 'views/application/users/account-profile/Profile2/ChangePassword';
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import { TabsProps } from 'types';
import {convertImageToBase64} from "../../../../utils/UserProfileUtils";
import axios from "../../../../utils/axios";
import {useDropzone} from "react-dropzone";
import {getCookie} from "../../../../utils/CookieUtils";

// tabs
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <div>{children}</div>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// tabs option
const tabsOption = [
    {
        label: '프로필',
        icon: <PersonOutlineTwoToneIcon />,
        caption: 'Profile Settings'
    },
/*    {
        label: 'Billing',
        icon: <DescriptionTwoToneIcon />,
        caption: 'Billing Information'
    },
    {
        label: 'Payment',
        icon: <CreditCardTwoToneIcon />,
        caption: 'Add & Update Card'
    },*/
    {
        label: '비밀번호 변경',
        icon: <VpnKeyTwoToneIcon />,
        caption: 'Update Profile Security'
    }
];

// ==============================|| PROFILE 2 ||============================== //

const UserProfileView = () => {
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const [value, setValue] = React.useState<number>(0);

    // const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId'));
    const [currentUserId, setCurrentUserId] = useState(getCookie('jwt', 'sub'));
    const [loginUserProfile, setLoginUserProfile] = useState<string | undefined>('');

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
                const mimeType = response.headers['content-type'];
                const base64String = response.data;
                const dataUrl = `data:${mimeType};base64,${base64String}`;
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


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title="Account Settings" content={false}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={4}>
                            <CardContent>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    orientation="vertical"
                                    variant="scrollable"
                                    sx={{
                                        '& .MuiTabs-flexContainer': {
                                            borderBottom: 'none'
                                        },
                                        '& button': {
                                            color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[600],
                                            minHeight: 'auto',
                                            minWidth: '100%',
                                            py: 1.5,
                                            px: 2,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            textAlign: 'left',
                                            justifyContent: 'flex-start',
                                            borderRadius: `${borderRadius}px`
                                        },
                                        '& button.Mui-selected': {
                                            color: theme.palette.primary.main,
                                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
                                        },
                                        '& button > svg': {
                                            marginBottom: '0px !important',
                                            marginRight: 1.25,
                                            marginTop: 1.25,
                                            height: 20,
                                            width: 20
                                        },
                                        '& button > div > span': {
                                            display: 'block'
                                        },
                                        '& > div > span': {
                                            display: 'none'
                                        }
                                    }}
                                >
                                    {tabsOption.map((tab, index) => (
                                        <Tab
                                            key={index}
                                            icon={tab.icon}
                                            label={
                                                <Grid container direction="column">
                                                    <Typography variant="subtitle1" color="inherit">
                                                        {tab.label}
                                                    </Typography>
                                                    <Typography component="div" variant="caption" sx={{ textTransform: 'capitalize' }}>
                                                        {tab.caption}
                                                    </Typography>
                                                </Grid>
                                            }
                                            {...a11yProps(index)}
                                        />
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <CardContent
                                sx={{
                                    borderLeft: '1px solid',
                                    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[200],
                                    height: '100%'
                                }}
                            >
                                <TabPanel value={value} index={0}>
                                    {/*<UserProfile loginUserProfile={ loginUserProfile } />*/}
                                    <UserProfile />
                                </TabPanel>
{/*                                <TabPanel value={value} index={1}>
                                    <Billing />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <Payment />
                                </TabPanel>*/}
                                <TabPanel value={value} index={1}>
                                    <ChangePassword />
                                </TabPanel>
                            </CardContent>
                        </Grid>
                    </Grid>
                    <Divider />
                    <CardActions>
                        <Grid container justifyContent="space-between" spacing={0}>
                            <Grid item>
                                {value > 0 && (
                                    <AnimateButton>
                                        <Button variant="outlined" size="large" onClick={(e) => handleChange(e, value - 1)}>
                                            Back
                                        </Button>
                                    </AnimateButton>
                                )}
                            </Grid>
                            <Grid item>
                                {value < 3 && (
                                    <AnimateButton>
                                        <Button variant="contained" size="large" onClick={(e) => handleChange(e, 1 + value)}>
                                            Continue
                                        </Button>
                                    </AnimateButton>
                                )}
                            </Grid>
                        </Grid>
                    </CardActions>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default UserProfileView;
