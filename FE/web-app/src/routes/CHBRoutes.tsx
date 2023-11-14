// project imports
import MainLayout from 'layout/MainLayout';
import CoupleProfileView from 'views/chb/couple/CoupleProfileView';
import DateScheduleView from 'views/chb/couple/DateScheduleView';
import Index from 'views/chb/user/profile';
import AdminMainView from 'views/chb/admin/AdminView';
import ApplyCoupleAccountView from "../views/chb/couple/ApplyCoupleAccountView";
import RolesConditionRoute from '../routes/RolesConditionRoute';
import PersonalUserProfileView from 'views/chb/user/profile/PersonalUserProfileView';
import { ADMIN, USER, COUPLE } from './Roles';

// sample page routing
import SamplePage from 'views/sample-page/index';
import AuthGuard from "../utils/route-guard/AuthGuard";
import Dashboard from "../views/dashboard/Default";


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
            element: (
                <RolesConditionRoute
                    permission={ USER }
                    truePath={ applyCoupleAccountPath }
                    falsePath='/profile/couple'
                    // element={ <ApplyCoupleAccountView /> }
                    trueElement={ <ApplyCoupleAccountView /> }
                    falseElement={ <CoupleProfileView /> }
                />
            ),
        },
        {
            path: '/profile/couple',
            element: (
                <RolesConditionRoute
                    permission={ COUPLE }
                    truePath='/profile/couple'
                    falsePath={ applyCoupleAccountPath }
                    // element={ <CoupleProfileView /> }
                    trueElement={ <CoupleProfileView /> }
                    falseElement={ <ApplyCoupleAccountView /> }
                />
                )
        },
        {
            path: '/date/schedule',
            element: (
                <RolesConditionRoute
                    permission={ COUPLE }
                    truePath='/date/schedule'
                    falsePath={ applyCoupleAccountPath }
                    // element={ <DateScheduleView /> }
                    trueElement={ <DateScheduleView /> }
                    falseElement={ <ApplyCoupleAccountView /> }
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
                    permission={ ADMIN }
                    truePath='/admin-main'
                    falsePath='/'
                    // element={ <AdminMainView /> }
                    trueElement={ <AdminMainView /> }
                    falseElement={ <Dashboard /> }
                />
            )
        }
    ]
}

export default CHBRoutes;