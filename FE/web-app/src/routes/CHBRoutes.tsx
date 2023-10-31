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


// ==============================|| MAIN ROUTING ||============================== //

const CHBRoutes = {
    path: '/',
    element: (
        <MainLayout />
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
                    falsePath='/profile/user'
                    element={ <AdminMainView /> }
                />
            )
        }
    ]
}

export default CHBRoutes;