import React, {ReactElement, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {clearAlert, showErrorAlert} from "../store/slices/alert";
import {WEB_TYPE_ALERT} from "../store/actions";

import ko from "../assets/language/ko.json";
import {errorSweetAlert, successSweetAlert} from "../utils/alertUtil";
import {ROUTE_MAP} from "./routeAuth";

const KOR_WEB_MESSAGE = ko['web'];

interface ConditionalRouteProps {
    permission: string;
    truePath: string;
    falsePath: string;
    element: ReactElement;
}


export const ConditionalRoute: React.FC<ConditionalRouteProps> = ({ permission, truePath, falsePath, element }) => {
    const navigate = useNavigate();

    // @ts-ignore
    const alertState = useSelector((state) => state.alert); // Redux Toolkit의 알림 상태
    const dispatchAlert = useDispatch(); // Redux Toolkit의 디스패치 함수

    // 권한 useEffect
    useEffect(() => {
        if (ROUTE_MAP.get(permission)) navigate(truePath);
        else {
            navigate(falsePath);
            dispatchAlert(
                showErrorAlert({
                    errorMessage: KOR_WEB_MESSAGE.blockedByAuth,
                    alertType: WEB_TYPE_ALERT
                })
            );
        }
    }, [ permission ]);

    // alert useEffect
    useEffect(() => {
        if (alertState.showErrorAlert) {
            errorSweetAlert(alertState.errorMessage, alertState.alertType);
            dispatchAlert(clearAlert());
        }
        if (alertState.showSuccessAlert) {
            successSweetAlert(alertState.successMessage, alertState.alertType);
            dispatchAlert(clearAlert());
        }
    }, [alertState.showErrorAlert, alertState.showSuccessAlert, alertState.errorMessage, alertState.alertType]);

    return null;
};

export default ConditionalRoute;