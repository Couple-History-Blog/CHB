// project imports
import MainLayout from 'layout/MainLayout';
import CoupleProfileView from 'views/chb/couple/CoupleProfileView';
import DateScheduleView from 'views/chb/couple/DateScheduleView';
import UserProfileView from 'views/chb/user/UserProfileView';
import AdminMainView from 'views/chb/admin/AdminView';
import RolesConditionRoute, { hasPermission } from '../routes/RolesConditionRoute';
import { ADMIN, USER, COUPLE } from './Roles';

// sample page routing
import SamplePage from 'views/sample-page/index';
import AuthGuard from "../utils/route-guard/AuthGuard";


// ==============================|| MAIN ROUTING ||============================== //

const CHBRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/profile/couple',
            element: <CoupleProfileView />
        },
        {
            path: '/date/schedule',
            element: <DateScheduleView />
        },
        {
            path: '/profile/user',
            element: <UserProfileView />
        },
        {
            path: '/admin-main',
            element: (
                <RolesConditionRoute
                    condition={ hasPermission(ADMIN) }
                    truePath='/admin-main'
                    falsePath='/'
                    element={ <AdminMainView /> }
                />
            )
        }
    ]
}

export default CHBRoutes;