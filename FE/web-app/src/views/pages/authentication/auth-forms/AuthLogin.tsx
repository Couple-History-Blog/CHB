import React, {useReducer} from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
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
    OutlinedInput,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ko from '../../../../assets/language/ko.json';
import alertReducer from "../../../../store/alertReducer";
import {AlertState} from "../../../../types/alert";
import { LOGIN_FORM_TYPE } from "../../../../store/actions";
import {showErrorAlert} from "../../../../store/slices/alert";
import {useDispatch} from "react-redux";
import CredentialInputForm from "./CredentialInputForm";

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
    const theme = useTheme();

    const { login } = useAuth();
    const scriptedRef = useScriptRef();

    const [checked, setChecked] = React.useState(true);
    const dispatchAlert = useDispatch(); // Redux Toolkit의 디스패치 함수


    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const KOR_LOGIN_MESSAGE = ko['sign-in'];
    const KOR_VALID_MESSAGE = ko['valid'];
    const KOR_SERVER_MESSAGE = ko['server'];

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault()!;
    };

    return (
        <CredentialInputForm
            formType={ LOGIN_FORM_TYPE }
            // formType={ REGISTER_FORM_TYPE }
        />
/*
        <Formik
            initialValues={{
                userId: 'wtf2327',
                userPassword: 'qwer1234',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                userId: Yup.string()
                    .required(KOR_VALID_MESSAGE.idNullValid)
                    .max(20, KOR_VALID_MESSAGE.idLengthOverValid),
                userPassword: Yup.string()
                    .required(KOR_VALID_MESSAGE.passwordNullValid)
                    .max(30, KOR_VALID_MESSAGE.passwordLengthOverValid)
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await login(values.userId, values.userPassword);

                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                    }
                } catch (err: any) {
                    console.error(err);
                    if (err == 'Wrong Services') {
                        const errMsg = KOR_SERVER_MESSAGE.serverConnectFail;
                        dispatchAlert(
                            showErrorAlert({
                                errorMessage: errMsg,
                                alertType: SERVER_TYPE_ALERT
                            })
                        );
                    }
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.userId && errors.userId)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-login">{ KOR_LOGIN_MESSAGE.inputId }</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="text"
                            value={values.userId}
                            name="userId"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.userId && errors.userId && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {errors.userId}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.userPassword && errors.userPassword)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-login">{ KOR_LOGIN_MESSAGE.inputPw }</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            value={values.userPassword}
                            name="userPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            endAdornment={
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
                            }
                            inputProps={{}}
                            label="Password"
                        />
                        {touched.userPassword && errors.userPassword && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.userPassword}
                            </FormHelperText>
                        )}
                    </FormControl>

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
                                label={ KOR_LOGIN_MESSAGE.saveSignInInfo }
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to='/forgot'
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                { KOR_LOGIN_MESSAGE.lostPassword }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                { KOR_LOGIN_MESSAGE.signInSubTitle }
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
*/
    );
};

export default JWTLogin;
