// material-ui
import {Box, Button, Grid, IconButton, InputAdornment, TextField, useMediaQuery} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import {
	SERVER_TYPE_ALERT, WEB_TYPE_ALERT
} from "../../../store/actions";
import Avatar from 'ui-component/extended/Avatar';
import React, {useEffect, useState} from "react";
import {convertImageToBase64, getUserProfile64Data} from 'utils/UserProfileUtils';

// fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    fadCircleHeart as circleHeartIcon,
    fasUserHairLong as femaleUserIcon,
    fasUserHair as maleUserIcon
} from 'utils/font-awesome/icons';

// ETC
import 'assets/scss/style.scss';
import {Field, FieldInputProps, Formik} from "formik";
import * as Yup from "yup";
import ko from "../../../assets/language/ko.json";
import {clearAlert, showErrorAlert, showSuccessAlert} from "../../../store/slices/alert";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import {useSelector} from "react-redux";
import {useDispatch} from "../../../store";
import {errorSweetAlert, successSweetAlert} from "../../../utils/alertUtil";
import {useTheme} from "@mui/material/styles";
import {applyCoupleAccountAsync, checkExistUserAsync, getCurrentUserGenderAsync} from "../../../constant/api";
import PermIdentityTwoToneIcon from "@mui/icons-material/PermIdentityTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import PersonSearchTwoToneIcon from "@mui/icons-material/PersonSearchTwoTone";
import {getCookie} from "../../../utils/CookieUtils";


// ==============================|| 커플 계정 신청 페이지 ||============================== //
const SamplePage = ({...others}) => {

	// [[ ===================== Message ===================== ]]
	const KOR_LOGIN_MESSAGE = ko['sign-in'];
	const KOR_APPLY_MESSAGE = ko['apply-couple-account'];
	const KOR_SERVER_MESSAGE = ko['server'];
	const KOR_VALID_MESSAGE = ko['valid'];
	
	
	
    // [[ ===================== Alert ===================== ]]
    // @ts-ignore
    const alertState = useSelector((state) => state.alert); // Redux Toolkit의 알림 상태
    const dispatchAlert = useDispatch(); // Redux Toolkit의 디스패치 함수
	
	
	
    // [[ ===================== Normal ===================== ]]
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));


	// [[ ===================== useState ===================== ]]
	// { ID }
	const [isAvailableId, setIsAvailableId] = React.useState(false);
	const [isFirstAvailableId, setIsFirstAvailableId] = React.useState(true);
	const [inputUserId, setInputUserId] = React.useState('');
	const [isUsernameMinLengthValid, setIsUsernameMinLengthValid] = React.useState(false);

	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const [userGender, setUserGender] = useState('');

	const [currentUserId, setCurrentUserId] = useState(getCookie('jwt', 'sub'));

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [otherUser, setOtherUser] = useState('');
	const [findOtherUser, setFindOtherUser] = useState<boolean>(false);

	const [loginUserProfile, setLoginUserProfile] = useState(getUserProfile64Data() || '');
	const [otherUserProfile, setOtherUserProfile] = useState('');


	// [[ ===================== useEffect ===================== ]]
    // alert useEffect
    useEffect(() => {
        if (alertState.showErrorAlert) {
            errorSweetAlert(alertState.errorMessage, alertState.alertType);
        }
        if (alertState.showSuccessAlert) {
            successSweetAlert(alertState.successMessage, alertState.alertType);
        }
        dispatchAlert(clearAlert());
    }, [alertState.showErrorAlert, alertState.showSuccessAlert, alertState.errorMessage, alertState.alertType]);

	// ID Valid useEffect
	useEffect(() => {
		// 아이디 중복체크 한 후 값 변경하는지 체크
		if (!isFirstAvailableId && isAvailableId) {
			setIsAvailableId(false);
			setFindOtherUser(false);
		}
		// 아이디 최소 입력 글자 수 만족하지 않거나 공백 포함되어 있으면 중복여부 확인 불가능
		if (inputUserId.length >= 5 && !isGap(inputUserId)) {
			setIsUsernameMinLengthValid(true);
			setFindOtherUser(false);
		}
		else setIsUsernameMinLengthValid(false);
	}, [inputUserId]);

	// getUserGender
	useEffect(() => {
		fetchUserGender();
	}, [])


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

	const isExistUser = async (id: string | null) => {
		try {
			if (!id) {
				dispatchAlert(showErrorAlert({
					errorMessage: KOR_VALID_MESSAGE.idNullValid,
					alertType: SERVER_TYPE_ALERT
				}));
			} else {
				const response = await checkExistUserAsync({id});
				const existUser = response.data;
				const currentUser = getCookie('jwt', 'sub');
				if (currentUser === id) {
					dispatchAlert(showErrorAlert({
						errorMessage: KOR_APPLY_MESSAGE.pleaseSearchOtherUser,
						alertType: SERVER_TYPE_ALERT
					}));
				} else if (existUser) {
					if (isFirstAvailableId) setIsFirstAvailableId(false);
					setIsAvailableId(true);
					setFindOtherUser(true);
					setOtherUser(id);
					const response = await convertImageToBase64(id);
					setOtherUserProfile(response);
					dispatchAlert(showSuccessAlert({
						successMessage: KOR_APPLY_MESSAGE.findUser,
						alertType: SERVER_TYPE_ALERT
					}));
				} else {
					setIsAvailableId(false);
					dispatchAlert(showErrorAlert({
						errorMessage: KOR_APPLY_MESSAGE.cannotFindUser,
						alertType: SERVER_TYPE_ALERT
					}));
				}
			}
		} catch (err) {
			// @ts-ignore
			let errMsg = (err.message ?? err) === 'Wrong Services' ? KOR_SERVER_MESSAGE.serverConnectFail : err.message;
			dispatchAlert(showErrorAlert({
				errorMessage: errMsg,
				alertType: WEB_TYPE_ALERT
			}));
		}
	}

	// 공백 여부 확인
	const isGap = (inputValue: string) => {
		return inputValue.includes(' ');
	}

	const handleMouseDownPassword = (event: React.SyntheticEvent) => {
		event.preventDefault();
	};

	const changeId = (inputId: string) => {
		setInputUserId(inputId);
	}


	return (
        <>
            <MainCard title="커플 연결 중...">
                <Grid container spacing={3} justifyContent="center">
                    <Grid item>
                        <Avatar color='primary' alt="Avatar 1" src={ loginUserProfile } size='customXl'/>
                    </Grid>
                    <Grid item>
                        <FontAwesomeIcon icon={circleHeartIcon} size="2xl" className={'heart-style'}/>
                    </Grid>
                    <Grid item>
						{ !findOtherUser && (
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
						{ findOtherUser && isAvailableId && (
							<Avatar alt="User 1" src={ otherUserProfile } size='customXl' />
						)}
                    </Grid>
                </Grid>
                <Formik
                    initialValues={{
                        userId: '',
                        beCoupleDate: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        beCoupleDate: Yup.string().required(KOR_APPLY_MESSAGE.beCoupleDateNullValid),
                        userId: Yup.string()
                            .test('space-check', KOR_VALID_MESSAGE.spaceValid, (value) => {
                                if (value) return !isGap(value);
                                return true;
                            })
                            .min(5, KOR_VALID_MESSAGE.idLengthLessValid)
                            .max(20, KOR_VALID_MESSAGE.idLengthOverValid)
                            .required(KOR_VALID_MESSAGE.idNullValid)
                            .nullable(),
                    })}
                    onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                        try {
							if (!isAvailableId) {
								dispatchAlert(showErrorAlert({errorMessage: KOR_VALID_MESSAGE.idCheckCanUse,
									alertType: SERVER_TYPE_ALERT}));
								return;
							}
							const body = {
								userId: currentUserId,
								beCoupleDate: new Date(values.beCoupleDate).toLocaleDateString('fr-CA'),
								otherUserId: values.userId
							};
							await applyCoupleAccountAsync(body);

							setIsLoading(true);
							setTimeout(() => {  // 로딩 구현
								setIsLoading(false);
								dispatchAlert(
									showSuccessAlert({successMessage: KOR_APPLY_MESSAGE.applyCoupleAccountSuccess,
										alertType: SERVER_TYPE_ALERT}));
							}, 1500);
                        } catch (err: any) {
                            const errMsg = err.message;
                            dispatchAlert(
                                showErrorAlert({
                                    errorMessage: errMsg,
                                    alertType: SERVER_TYPE_ALERT
                                })
                            );
                        }
                    }}
                >
                    {({errors, handleBlur, handleChange, handleSubmit, touched, values}) => (
						<Grid container justifyContent="center">
						<form noValidate onSubmit={handleSubmit} {...others} style={{ marginTop: '7%', width: '70%' }}>
                            <>
                                <Grid container justifyContent="center">
									<Grid item xs={12} sm={4}>
										<Field name='userId'>
											{({field}: { field: FieldInputProps<string> }) => (
												<TextField
													fullWidth
													error={Boolean(touched.userId && errors.userId)}
													helperText={Boolean(touched.userId && errors.userId) ? errors.userId : null}
													label="상대방 아이디"
													margin="normal"
													type="text"
													{...field}
													onBlur={handleBlur}
													onChange={(e) => {
														handleChange(e);
														changeId(e.target.value)
													}}
													InputProps={{
														style: {height: '62.12px'},
														startAdornment: (
															<InputAdornment position="start">
																<PermIdentityTwoToneIcon fontSize="medium"
																						 sx={{color: theme.palette.grey[700]}}/>
															</InputAdornment>
														),
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	disabled={!isUsernameMinLengthValid || isAvailableId}
																	aria-label="toggle password visibility"
																	onChange={handleChange}
																	onClick={() => isExistUser(values.userId)}
																	onMouseDown={handleMouseDownPassword}
																	edge="end"
																	size="large"
																>
																	{isAvailableId ? <CheckCircleTwoToneIcon fontSize='medium'/> :
																		<PersonSearchTwoToneIcon fontSize='medium'/>}
																</IconButton>
															</InputAdornment>
														)
													}}
													InputLabelProps={{
														shrink: true
													}}
												/>
											)}
										</Field>
									</Grid>
                                    <Grid item xs={12} sm={4} style={{ marginLeft: '16px' }}>
										<Field name='beCoupleDate'>
											{({field}: { field: FieldInputProps<string>; }) => (
												<LocalizationProvider dateAdapter={AdapterDateFns}>
													<DatePicker
														onChange={(newValue) => {
															newValue ? values.beCoupleDate = newValue.toString() : values.beCoupleDate = '';
															newValue ? setSelectedDate(new Date(newValue)) : console.log('XXXXX');
														}}
														renderInput={(params) => (
															<TextField
																fullWidth
																error={Boolean(touched.beCoupleDate && errors.beCoupleDate)}
																helperText={Boolean(touched.beCoupleDate && errors.beCoupleDate) ? errors.beCoupleDate : null}
																margin="normal"
																{ ...params }
															/>
														)}
														label="사귄 날"
														value={selectedDate}
														inputFormat="yyyy년 MM월 dd일"
														InputProps={{
															style: {height: '62.12px'}
														}}
													/>
												</LocalizationProvider>
											)}
										</Field>
                                    </Grid>
									<Box sx={{mt: 2, width: '69%'}}>
										<AnimateButton>
											<Button
												style={{backgroundColor: isAvailableId ? '#673ab7' : 'gray'}}
												fullWidth
												size="large"
												type="submit"
												variant="contained"
												color="secondary"
											>
												{KOR_APPLY_MESSAGE.doApply}
											</Button>
										</AnimateButton>
									</Box>
                                </Grid>
                            </>
                        </form>
						</Grid>
                    )}
                </Formik>
            </MainCard>
        </>
    )
};

export default SamplePage;
