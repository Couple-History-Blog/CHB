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
    id: 'couple-list',
    title: <FormattedMessage id="커플" />,
    type: 'group',
    children: [
        {
            id: 'date-schedule',
            title: <FormattedMessage id='데이트 일정' />,
            type: 'item',
            url: '/date/schedule',
            icon: icons.IconCalendarHeart,
            breadcrumbs: false
        }
    ]
}

export default couple;