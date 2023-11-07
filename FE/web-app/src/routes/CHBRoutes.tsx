// project imports
import MainLayout from 'layout/MainLayout';
import CoupleProfileView from 'views/chb/couple/CoupleProfileView';
import DateScheduleView from 'views/chb/couple/DateScheduleView';
import Index from 'views/chb/user/profile';
import AdminMainView from 'views/chb/admin/AdminView';
import ApplyCoupleAccountView from "../views/chb/couple/ApplyCoupleAccountView";
import RolesConditionRoute, { hasPermission } from '../routes/RolesConditionRoute';
import PersonalUserProfileView from 'views/chb/user/profile/PersonalUserProfileView';
import { ADMIN, USER, COUPLE } from './Roles';

// sample page routing
import SamplePage from 'views/sample-page/index';
import AuthGuard from "../utils/route-guard/AuthGuard";


// ==============================|| MAIN ROUTING ||============================== //
const applyCoupleAccountPath = '/apply-couple-account';

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
            path: applyCoupleAccountPath,
            element: <ApplyCoupleAccountView />
        },
        {
            path: '/profile/couple',
            element: (
                <RolesConditionRoute
                    condition={ hasPermission(COUPLE) }
                    truePath='/profile/couple'
                    falsePath={ applyCoupleAccountPath }
                    element={ <CoupleProfileView /> }
                />
                )
        },
        {
            path: '/date/schedule',
            element: (
                <RolesConditionRoute
                    condition={ hasPermission(COUPLE) }
                    truePath='/date/schedule'
                    falsePath={ applyCoupleAccountPath }
                    element={ <DateScheduleView /> }
                />
            )
        },
        {
          path: '/profile/user',
          element: <PersonalUserProfileView />
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