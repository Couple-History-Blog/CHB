import { createSlice } from '@reduxjs/toolkit';
import { successSweetAlert, errorSweetAlert } from '../../utils/alertUtil';
import ko from "../../assets/language/ko.json";
import { AlertState } from "../../types/alert";
import {LOGIN_TYPE_ALERT} from "../actions";

const KOR_LOGIN_MESSAGE = ko['sign-in'];

const initialState: AlertState = {
    alertType: null,
    errorMessage: null,
    successMessage: null,
    showSuccessAlert: false,
    showErrorAlert: false
};

// alert의 알림 상태 및 관련 액션을 정의.
const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showErrorAlert: (state, action) => {
            state.errorMessage = action.payload.errorMessage;
            state.showErrorAlert = true;
            state.alertType = action.payload.alertType;
        },
        showSuccessAlert: (state, action) => {
            state.successMessage = action.payload.successMessage;
            state.showSuccessAlert = true;
            state.alertType = action.payload.alertType;
        },
        clearAlert: (state) => {
            state.errorMessage = null;
            state.showErrorAlert = false;
            state.showSuccessAlert = false;
            state.alertType = null;
        },
    }
})

export const { showErrorAlert, showSuccessAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
