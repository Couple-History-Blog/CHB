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
    id: 'user-list',
    title: <FormattedMessage id="개인" />,
    type: 'group',
    children: [
        {
            id: 'user-profile',
            title: <FormattedMessage id="개인 프로필" />,
            type: 'item',
            url: '/profile/user',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
}

export default couple;