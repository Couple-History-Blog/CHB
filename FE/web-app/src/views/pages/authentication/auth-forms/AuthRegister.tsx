import React, {createContext, useEffect} from 'react';
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
import IdAndPwInputForms from './CredentialInputForm';
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
import {id} from "date-fns/locale";

import CredentialInputForm from './CredentialInputForm';
// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = ({ ...others }) => {


    return (
        <CredentialInputForm />
    );
};

export default JWTRegister;
