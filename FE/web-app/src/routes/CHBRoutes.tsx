import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import CoupleProfileView from 'views/chb/couple/CoupleProfileView';
import DateScheduleView from 'views/chb/couple/DateScheduleView';
import UserProfileView from 'views/chb/user/UserProfileView';
import AdminMainView from 'views/chb/admin/AdminView';


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
            element: <AdminMainView />
        }
    ]
}

export default CHBRoutes;