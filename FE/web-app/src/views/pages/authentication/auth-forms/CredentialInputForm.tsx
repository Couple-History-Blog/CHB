import {Field, FieldInputProps, Formik} from "formik";
import * as Yup from "yup";
import {clearAlert, showErrorAlert, showSuccessAlert} from "../../../../store/slices/alert";
import {
    LOGIN_FORM_TYPE,
    REGISTER_FORM_TYPE,
    SERVER_TYPE_ALERT,
    SIGNUP_TYPE_ALERT,
    WEB_TYPE_ALERT
} from "../../../../store/actions";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import React, {useEffect, useState} from "react";
import ko from "../../../../assets/language/ko.json";
import {useSelector} from "react-redux";
import {useDispatch} from "../../../../store";
import {StringColorProps} from "../../../../types";
import useAuth from "../../../../hooks/useAuth";
import {checkExistUserAsync} from "../../../../constant/api";
import {strengthColor, strengthIndicator} from "../../../../utils/password-strength";
import {errorSweetAlert, successSweetAlert} from "../../../../utils/alertUtil";

// material-ui
import {
    Box,
    Button, Checkbox, FormControl, FormControlLabel,
    FormHelperText,
    Grid,
    IconButton, IconProps,
    InputAdornment,
    MenuItem,
    TextField, Typography,
    useMediaQuery
} from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import {useTheme} from "@mui/material/styles";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PermIdentityTwoToneIcon from "@mui/icons-material/PermIdentityTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import PersonSearchTwoToneIcon from "@mui/icons-material/PersonSearchTwoTone";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fasAddressCard as addressCardIcon } from 'utils/font-awesome/icons';
import {DateField} from "@mui/x-date-pickers/DateField/DateField";

// @ts-ignore
const CredentialInputForm = ({formType, ...others}) => {

    // [[ ===================== useState ===================== ]]
    // { password }
    const [showPassword, setShowPassword] = React.useState(false);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // { agree }
    const [checked, setChecked] = React.useState(true);

    // { ID }
    const [isAvailableId, setIsAvailableId] = React.useState(false);
    const [isFirstAvailableId, setIsFirstAvailableId] = React.useState(true);
    const [inputUserId, setInputUserId] = React.useState('');
    const [isUsernameMinLengthValid, setIsUsernameMinLengthValid] = React.useState(false);


    // [[ ===================== Message ===================== ]]
    const KOR_LOGIN_MESSAGE = ko['sign-in'];
    const KOR_SERVER_MESSAGE = ko['server'];
    const KOR_VALID_MESSAGE = ko['valid'];


    // [[ ===================== Normal ===================== ]]
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const {register} = useAuth();
    const {login} = useAuth();
    const userNameMinLength = 5;


    // [[ ===================== Alert ===================== ]]
    // @ts-ignore
    const alertState = useSelector((state) => state.alert); // Redux Toolkit의 알림 상태
    const dispatchAlert = useDispatch(); // Redux Toolkit의 디스패치 함수


    // [[ ===================== useEffect ===================== ]]
    useEffect(() => {
        changePassword('123456');
    }, []);

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

    useEffect(() => {
        // 아이디 중복체크 한 후 값 변경하는지 체크
        if (!isFirstAvailableId && isAvailableId) setIsAvailableId(false);
        // 아이디 최소 입력 글자 수 만족하지 않거나 공백 포함되어 있으면 중복여부 확인 불가능
        if (inputUserId.length >= 5 && !isGap(inputUserId)) setIsUsernameMinLengthValid(true);
        else setIsUsernameMinLengthValid(false);
    }, [inputUserId]);


    // [[ ===================== Function ===================== ]]
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const checkAvailableId = async (id: string | null) => {
        try {
            if (!id) {
                dispatchAlert(showErrorAlert({
                    errorMessage: KOR_VALID_MESSAGE.idNullValid,
                    alertType: SERVER_TYPE_ALERT
                }));
            } else {
                const response = await checkExistUserAsync({id});
                const isExistUser = response.data;
                if (isExistUser) {
                    setIsAvailableId(false);
                    dispatchAlert(showErrorAlert({
                        errorMessage: KOR_SERVER_MESSAGE.alreadyExistUserId,
                        alertType: SERVER_TYPE_ALERT
                    }));
                } else {
                    if (isFirstAvailableId) setIsFirstAvailableId(false);
                    setIsAvailableId(true);
                    dispatchAlert(showSuccessAlert({
                        successMessage: KOR_SERVER_MESSAGE.canUseId,
                        alertType: SERVER_TYPE_ALERT
                    }));
                }
/*
                const canUseId = response.data;
                if (canUseId) {
                    if (isFirstAvailableId) setIsFirstAvailableId(false);
                    setIsAvailableId(true);
                    dispatchAlert(showSuccessAlert({
                        successMessage: KOR_SERVER_MESSAGE.canUseId,
                        alertType: SERVER_TYPE_ALERT
                    }));
                } else {
                    setIsAvailableId(false);
                    dispatchAlert(showErrorAlert({
                        errorMessage: KOR_SERVER_MESSAGE.alreadyExistUserId,
                        alertType: SERVER_TYPE_ALERT
                    }));
                }
*/
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

    const sexTypeList = [
        {label: '남자', val: 'MALE'},
        {label: '여자', val: 'FEMALE'}
    ]
    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const changeId = (inputId: string) => {
        setInputUserId(inputId);
    }

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    // 공백 여부 확인
    const isGap = (inputValue: string) => {
        return inputValue.includes(' ');
    }


    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    sexType: '',
                    birthDate: '',
                    nickName: '',
                    userId: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: formType === REGISTER_FORM_TYPE
                        ? Yup.string().max(60, KOR_VALID_MESSAGE.emailLengthOverValid)
                            .required(KOR_VALID_MESSAGE.emailNullValid)
                            .email(KOR_VALID_MESSAGE.emailFormValid)
                        : Yup.string(),
                    firstName: formType === REGISTER_FORM_TYPE
                        ? Yup.string().test('space-check', KOR_VALID_MESSAGE.spaceValid, (value) => {
                            if (value) return !isGap(value);
                            return true;
                        })
                            .required(KOR_VALID_MESSAGE.firstNameNullValid)
                        : Yup.string(),
                    lastName: formType === REGISTER_FORM_TYPE
                        ? Yup.string().test('space-check', KOR_VALID_MESSAGE.spaceValid, (value) => {
                            if (value) return !isGap(value);
                            return true;
                        })
                            .required(KOR_VALID_MESSAGE.lastNameNullValid)
                        : Yup.string(),
                    sexType: formType === REGISTER_FORM_TYPE
                        ? Yup.string().required(KOR_VALID_MESSAGE.sexTypeNullValid)
                            .nullable()
                        : Yup.string(),
                    nickName: formType === REGISTER_FORM_TYPE
                        ? Yup.string().required(KOR_VALID_MESSAGE.nickNameNullValid)
                            .nullable()
                        : Yup.string(),
                    birthDate: formType === REGISTER_FORM_TYPE
                        ? Yup.string().required(KOR_VALID_MESSAGE.brthNullValid)
                        : Yup.string(),
                    userId: Yup.string()
                        .test('space-check', KOR_VALID_MESSAGE.spaceValid, (value) => {
                            if (value) return !isGap(value);
                            return true;
                        })
                        .min(userNameMinLength, KOR_VALID_MESSAGE.idLengthLessValid)
                        .max(20, KOR_VALID_MESSAGE.idLengthOverValid)
                        .required(KOR_VALID_MESSAGE.idNullValid)
                        .nullable(),
                    password: Yup.string()
                        .test('space-check', KOR_VALID_MESSAGE.spaceValid, (value) => {
                            // @ts-ignore
                            if (value) return !isGap(value);
                            return true;
                        })
                        .max(30, KOR_VALID_MESSAGE.passwordLengthOverValid)
                        .required(KOR_VALID_MESSAGE.passwordNullValid)
                })}
                onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                    try {
                        if (checked) {
                            if (formType === REGISTER_FORM_TYPE) await register(isAvailableId, values.userId, values.sexType, values.birthDate, values.email, values.password, values.firstName, values.lastName, values.nickName);
                            else if (formType === LOGIN_FORM_TYPE) await login(values.userId, values.password);
                        } else {
                            dispatchAlert(
                                showErrorAlert({
                                    errorMessage: KOR_LOGIN_MESSAGE.checkAgreeInformationButton,
                                    alertType: SERVER_TYPE_ALERT
                                })
                            );
                        }
                    } catch (err: any) {
                        const errMsg = err.message;
                        dispatchAlert(
                            showErrorAlert({
                                errorMessage: errMsg,
                                alertType: SIGNUP_TYPE_ALERT
                            })
                        );
                    }
                }}
            >
                {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        {formType === REGISTER_FORM_TYPE ? (
                            <><Grid container spacing={matchDownSM ? 0 : 2}>
                                <Grid item xs={12} sm={6}>
                                    <Field name='firstName'>
                                        {({field}: { field: FieldInputProps<string>; }) => (
                                            <TextField
                                                fullWidth
                                                error={Boolean(touched.firstName && errors.firstName)}
                                                helperText={Boolean(touched.firstName && errors.firstName) ? errors.firstName : null}
                                                label="성"
                                                margin="normal"
                                                type="text"
                                                {...field}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                InputProps={{
                                                    style: {height: '62.12px'},
                                                }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}/>
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field name='lastName'>
                                        {({field}: { field: FieldInputProps<string>; }) => (
                                            <TextField
                                                fullWidth
                                                error={Boolean(touched.lastName && errors.lastName)}
                                                helperText={Boolean(touched.lastName && errors.lastName) ? errors.lastName : null}
                                                label="이름"
                                                margin="normal"
                                                type="text"
                                                {...field}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                InputProps={{
                                                    style: {height: '62.12px'},
                                                }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}/>
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field name='sexType'>
                                        {({field}: { field: FieldInputProps<string>; }) => (
                                            <TextField
                                                fullWidth
                                                error={Boolean(touched.sexType && errors.sexType)}
                                                helperText={Boolean(touched.sexType && errors.sexType) ? errors.sexType : null}
                                                label="성별"
                                                margin="normal"
                                                select
                                                {...field}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                InputProps={{
                                                    style: {height: '62.12px', marginTop: '-36px'} // 높이 설정 및 위로 옮김
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    style: {position: 'relative', top: '-15px', display: 'block'} // 라벨의 스타일 조절
                                                }}
                                            >
                                                {sexTypeList.map((option) => (
                                                    <MenuItem key={option.label} value={option.val}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12} sm={6} style={{ marginTop: '-16px' }}>
                                    <Field name='birthDate'>
                                        {({field}: { field: FieldInputProps<string>; }) => (
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    onChange={(newValue) => {
                                                        newValue ? values.birthDate = newValue.toString() : values.birthDate = '';
                                                        newValue ? setSelectedDate(new Date(newValue)) : console.log('XXXXX');
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            fullWidth
                                                            error={Boolean(touched.birthDate && errors.birthDate)}
                                                            helperText={Boolean(touched.birthDate && errors.birthDate) ? errors.birthDate : null}
                                                            margin="normal"
                                                            { ...params }
                                                        />
                                                        )}
                                                    label="생일"
                                                    value={selectedDate}
                                                    inputFormat="yyyy년 MM월 dd일"
                                                    InputProps={{
                                                        style: {height: '62.12px'}
                                                    }}
                                                />
                                            </LocalizationProvider>
/*
                                            <TextField
                                                fullWidth
                                                error={Boolean(touched.birthDate && errors.birthDate)}
                                                helperText={Boolean(touched.birthDate && errors.birthDate) ? errors.birthDate : null}
                                                label="생일"
                                                margin="normal"
                                                type="date"
                                                {...field}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                InputProps={{
                                                    style: {height: '62.12px', marginTop: '-36px'}
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    style: {position: 'relative', top: '-15px', display: 'block'}
                                                }}/>
*/
                                        )}
                                    </Field>
                                </Grid>
                            </Grid>
                                <Field name='nickName'>
                                    {({field}: { field: FieldInputProps<string>; }) => (
                                        <TextField
                                            fullWidth
                                            error={Boolean(touched.nickName && errors.nickName)}
                                            helperText={Boolean(touched.nickName && errors.nickName) ? errors.nickName : null}
                                            label="닉네임"
                                            margin="normal"
                                            type="text"
                                            {...field}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            InputProps={{
                                                style: {height: '62.12px'},
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FontAwesomeIcon icon={ addressCardIcon } size="lg" />
                                                    </InputAdornment>
                                                )
                                            }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}/>
                                    )}
                                </Field>
                                <Field name='email'>
                                    {({field}: { field: FieldInputProps<string>; }) => (
                                        <TextField
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                            helperText={Boolean(touched.email && errors.email) ? errors.email : null}
                                            label="메일"
                                            margin="normal"
                                            type="email"
                                            {...field}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            InputProps={{
                                                style: {height: '62.12px'},
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailTwoToneIcon fontSize="small"
                                                                          sx={{color: theme.palette.grey[700]}}/>
                                                    </InputAdornment>
                                                )
                                            }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}/>
                                    )}
                                </Field>
                            </>
                        ) : null}


                        <Field name='userId'>
                            {({field}: { field: FieldInputProps<string> }) => (
                                <TextField
                                    fullWidth
                                    error={Boolean(touched.userId && errors.userId)}
                                    helperText={Boolean(touched.userId && errors.userId) ? errors.userId : null}
                                    label="아이디"
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
                                        endAdornment: formType === REGISTER_FORM_TYPE && (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    disabled={!isUsernameMinLengthValid || isAvailableId}
                                                    aria-label="toggle password visibility"
                                                    onClick={() => checkAvailableId(values.userId)}
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
                        <Field name='password'>
                            {({field}: { field: FieldInputProps<string> }) => (
                                <TextField
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={Boolean(touched.password && errors.password) ? errors.password : null}
                                    label="비밀번호"
                                    margin="normal"
                                    type={showPassword ? 'text' : 'password'}
                                    {...field}
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                        changePassword(e.target.value);
                                    }}
                                    InputProps={{
                                        style: {height: '62.12px'},
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockTwoToneIcon fontSize="small"
                                                                 sx={{color: theme.palette.grey[700]}}/>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
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
                        {strength !== 0 && formType === REGISTER_FORM_TYPE && (
                            <FormControl fullWidth>
                                <Box sx={{mb: 2}}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{backgroundColor: level?.color}}
                                                sx={{width: 85, height: 8, borderRadius: '7px'}}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            {KOR_LOGIN_MESSAGE.agreeWithProvideUserInformation}
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{mt: 3}}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{mt: 2}}>
                            <AnimateButton>
                                <Button
                                    style={{backgroundColor: formType === REGISTER_FORM_TYPE ? (isAvailableId ? '#673ab7' : 'gray') : '#673ab7'}}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    {formType === REGISTER_FORM_TYPE ? KOR_LOGIN_MESSAGE.signUpComment : KOR_LOGIN_MESSAGE.signInSubTitle}
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>

    )
}

export default CredentialInputForm;