import React, { useEffect } from 'react';
import { useDispatch } from 'store';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import {Field, FieldInputProps, Formik} from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { StringColorProps } from 'types';
import ko from "../../../../assets/language/ko.json";
import {clearAlert, showErrorAlert, showSuccessAlert} from "../../../../store/slices/alert";
import {SIGNUP_TYPE_ALERT, SERVER_TYPE_ALERT, WEB_TYPE_ALERT} from "../../../../store/actions";
import {errorSweetAlert, successSweetAlert} from "../../../../utils/alertUtil";
import {useSelector} from "react-redux";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { checkAvailableIdAsync } from "../../../../constant/api";

// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = ({ ...others }) => {
    const theme = useTheme();
    const KOR_LOGIN_MESSAGE = ko['sign-in'];
    const KOR_SERVER_MESSAGE = ko['server'];
    const KOR_VALID_MESSAGE = ko['valid'];

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [isAvailableId, setIsAvailableId] = React.useState(false);
    const [isFirstAvailableId, setIsFirstAvailableId] = React.useState(true);
    const [inputUserId, setInputUserId] = React.useState('');

    // @ts-ignore
    const alertState = useSelector((state) => state.alert); // Redux Toolkit의 알림 상태
    const dispatchAlert = useDispatch(); // Redux Toolkit의 디스패치 함수

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();
    const { register } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const checkAvailableId = async (id: string | null) => {
        try {
            if (!id) {
                dispatchAlert(showErrorAlert({errorMessage: KOR_VALID_MESSAGE.idNullValid,
                                              alertType: SERVER_TYPE_ALERT}));
            } else {
                const response = await checkAvailableIdAsync({id});
                const canUseId = response.data;
                if (canUseId) {
                    if (isFirstAvailableId) setIsFirstAvailableId(false);
                    setIsAvailableId(true);
                    dispatchAlert(showSuccessAlert({successMessage: KOR_SERVER_MESSAGE.canUseId,
                                                    alertType: SERVER_TYPE_ALERT}));
                } else {
                    setIsAvailableId(false);
                    dispatchAlert(showErrorAlert({errorMessage: KOR_SERVER_MESSAGE.alreadyExistUserId,
                                                  alertType: SERVER_TYPE_ALERT}));
                }
            }
        } catch (err) {
            // @ts-ignore
            let errMsg = (err.message ?? err ) === 'Wrong Services' ? KOR_SERVER_MESSAGE.serverConnectFail : err.message;
            dispatchAlert(showErrorAlert({errorMessage: errMsg,
                                          alertType: WEB_TYPE_ALERT}));
        }

    }

    const sexTypeList = [
        { label: '남자', val: 'MALE' },
        { label: '여자', val: 'FEMALE' }
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

    // 아이디 중복체크 한 후 값 변경하는지 체크
    useEffect(() => {
        if (!isFirstAvailableId && isAvailableId) {
            setIsAvailableId(false);
        }
    }, [inputUserId]);

    return (
        <>
            <Formik
                initialValues={{
                    email: 'test@gmail.com',
                    password: 'testPwd',
                    firstName: '김',
                    lastName: '떙떙',
                    sexType: '',
                    brthDay: '2023-11-01',
                    id: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .max(60, KOR_VALID_MESSAGE.emailLengthOverValid)
                        .required(KOR_VALID_MESSAGE.emailNullValid)
                        .email(KOR_VALID_MESSAGE.emailFormValid),
                    password: Yup.string()
                        .required(KOR_VALID_MESSAGE.passwordNullValid)
                        .max(30, KOR_VALID_MESSAGE.passwordLengthOverValid),
                    firstName: Yup.string()
                        .required(KOR_VALID_MESSAGE.firstNameNullValid),
                    lastName: Yup.string()
                        .required(KOR_VALID_MESSAGE.lastNameNullValid),
                    sexType: Yup.string()
                        .required(KOR_VALID_MESSAGE.sexTypeNullValid)
                        .nullable(),
                    brthDay: Yup.string()
                        .required(KOR_VALID_MESSAGE.brthNullValid),
                    id: Yup.string()
                        .required(KOR_VALID_MESSAGE.idNullValid)
                        .nullable()

                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (checked) await register(isAvailableId, values.email, values.password, values.firstName, values.lastName);
                        else {
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
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <Field name='firstName'>
                                    {({ field }: { field: FieldInputProps<string> }) => (
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
                                                style: { height: '62.12px' },
                                            }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field name='lastName'>
                                    {({ field }: { field: FieldInputProps<string> }) => (
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
                                                style: { height: '62.12px' },
                                            }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field name='sexType'>
                                    {({ field }: { field: FieldInputProps<string> }) => (
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
                                                style: { height: '62.12px', marginTop: '-36px' } // 높이 설정 및 위로 옮김
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { position: 'relative', top: '-15px', display: 'block' } // 라벨의 스타일 조절
                                            }}
                                        >
                                            {sexTypeList.map((option) => (
                                                <MenuItem key={option.label} value={option.label}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Field name='brthDay'>
                                    {({ field }: { field: FieldInputProps<string> }) => (
                                        <TextField
                                            fullWidth
                                            error={Boolean(touched.brthDay && errors.brthDay)}
                                            helperText={Boolean(touched.brthDay && errors.brthDay) ? errors.brthDay : null}
                                            label="생일"
                                            margin="normal"
                                            type="date"
                                            {...field}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            InputProps={{
                                                style: { height: '62.12px', marginTop: '-36px' }
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { position: 'relative', top: '-15px', display: 'block' }
                                            }}
                                        />
                                    )}
                                </Field>
                            </Grid>
                        </Grid>
                        <Field name='email'>
                            {({ field }: { field: FieldInputProps<string> }) => (
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
                                        style: { height: '62.12px' },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailTwoToneIcon fontSize="small" sx={{ color: theme.palette.grey[700] }} />
                                            </InputAdornment>
                                        )
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            )}
                        </Field>
                        <Field name='id'>
                            {({ field }: { field: FieldInputProps<string> }) => (
                                <TextField
                                    fullWidth
                                    error={Boolean(touched.id && errors.id)}
                                    helperText={Boolean(touched.id && errors.id) ? errors.id : null}
                                    label="아이디"
                                    margin="normal"
                                    type="text"
                                    {...field}
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                        changeId(values.id)
                                    }}
                                    InputProps={{
                                        style: { height: '62.12px' },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PermIdentityTwoToneIcon fontSize="medium" sx={{ color: theme.palette.grey[700] }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={ () => checkAvailableId(values.id) }
                                                    onMouseDown={ handleMouseDownPassword }
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {isAvailableId ? <CheckCircleTwoToneIcon fontSize='medium'/> : <PersonSearchTwoToneIcon fontSize='medium'/>}
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
                            {({ field }: { field: FieldInputProps<string> }) => (
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
                                        style: { height: '62.12px' },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockTwoToneIcon fontSize="small" sx={{ color: theme.palette.grey[700] }} />
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
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
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
                                            { KOR_LOGIN_MESSAGE.agreeWithProvideUserInformation }
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    style={{ backgroundColor: isAvailableId ? '#673ab7' : 'gray' }}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    { KOR_LOGIN_MESSAGE.signUpComment }
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default JWTRegister;
