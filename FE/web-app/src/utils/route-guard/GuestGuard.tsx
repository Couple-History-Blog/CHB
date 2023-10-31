import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import {BASE_PATH, DASHBOARD_PATH} from 'config';
import { GuardProps } from 'types';
import { useEffect } from 'react';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: GuardProps) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            // navigate(DASHBOARD_PATH, { replace: true });
            navigate('', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export default GuestGuard;
