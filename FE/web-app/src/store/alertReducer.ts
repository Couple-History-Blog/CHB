import { SUCCESS_ALERT, ERROR_ALERT } from './actions';
import { AlertState } from "../types/alert";

interface AlertReducerActionProps {
    type: string;
    payload: AlertState | null;
}

const initialState: AlertState = {
    alertType: null,
    errorMessage: null,
    successMessage: null,
    showSuccessAlert: false,
    showErrorAlert: false
}

const alertReducer = (state = initialState, action: AlertReducerActionProps) => {
    // const { alertType } = action.payload!;    // !은 null이나 undefinded가 아님을 확신한다는 뜻
    const alertType = action.payload?.alertType || null;
    console.log("reducer");
    switch (action.type) {
        case SUCCESS_ALERT: {
            return {
                ...state,
                alertType,
                showSuccessAlert: true
            }
        }
        case ERROR_ALERT: {
            return {
                ...state,
                alertType,
                showErrorAlert: true
            }
        }
        default: {
            return { ...state };
        }
    }
};

export default alertReducer;