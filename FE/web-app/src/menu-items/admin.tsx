// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';
import { IconCalendarHeart } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics: IconDeviceAnalytics,
    IconCalendarHeart: IconCalendarHeart
};

// ==============================|| MENU ITEMS - COUPLE ||============================== //

const couple: NavItemType = {
    id: 'admin-main',
    title: <FormattedMessage id="관리자" />,
    type: 'group',
    children: [
        {
            id: 'admin-page',
            title: <FormattedMessage id="관리자 페이지" />,
            type: 'item',
            url: '/admin-main',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
}

export default couple;