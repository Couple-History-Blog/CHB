import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import CHBRoutes from './CHBRoutes';

import CHBLayout from 'layout/MainLayout/coupleHistoryBlog';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([{ path: '/', element: <CHBLayout /> },
        AuthenticationRoutes,
        LoginRoutes,
        MainRoutes,
        CHBRoutes]);
}
