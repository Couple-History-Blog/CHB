// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';
import { IconCalendarHeart } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';
import ko from "../assets/language/ko.json";

const KOR_WEB_MESSAGE = ko['web']['list']['admin'];

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics: IconDeviceAnalytics,
    IconCalendarHeart: IconCalendarHeart
};

// ==============================|| MENU ITEMS - COUPLE ||============================== //

const couple: NavItemType = {
    id: 'admin-main',
    title: KOR_WEB_MESSAGE.groupTitle,
    type: 'group',
    children: [
        {
            id: 'admin-page',
            title: KOR_WEB_MESSAGE.pageTitle,
            type: 'item',
            url: '/admin-main',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
}

export default couple;