import {ReactElement, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {showErrorAlert} from "../store/slices/alert";
import {WEB_TYPE_ALERT} from "../store/actions";

import ko from "../assets/language/ko.json";
import {errorSweetAlert, successSweetAlert} from "../utils/alertUtil";

const KOR_WEB_MESSAGE = ko['web'];

interface ConditionalRouteProps {
    condition: boolean;
    truePath: string;
    falsePath: string;
    element: ReactElement;
}

// 권한 가져오는 로직
const getUserRoles = (): string | null => {
    return localStorage.getItem('userRoles');
}

// 필요로 하는 권한이 있는지 확인하는 로직
export const hasPermission = (requiredPermission: string): boolean => {
    const userRoles = getUserRoles();
    return userRoles ? userRoles.includes(requiredPermission) : false;
}

export const ConditionalRoute: React.FC<ConditionalRouteProps> = ({ condition, truePath, falsePath, element }) => {
    const navigate = useNavigate();

    // @ts-ignore
    const alertState = useSelector((state) => state.alert); // Redux Toolkit의 알림 상태
    const dispatchAlert = useDispatch(); // Redux Toolkit의 디스패치 함수

    // 권한 useEffect
    useEffect(() => {
        if (condition) navigate(truePath);
        else {
            navigate(falsePath);
            dispatchAlert(
                showErrorAlert({
                    errorMessage: KOR_WEB_MESSAGE.blockedByAuth,
                    alertType: WEB_TYPE_ALERT
                })
            );
        }
    }, []);

    // alert useEffect
    useEffect(() => {
        if (alertState.showErrorAlert) {
            errorSweetAlert(alertState.errorMessage, alertState.alertType);
        }
        if (alertState.showSuccessAlert) {
            successSweetAlert(alertState.successMessage, alertState.alertType);
        }
    }, [alertState.showErrorAlert, alertState.showSuccessAlert, alertState.errorMessage, alertState.alertType]);

    return null;
};

export default ConditionalRoute;