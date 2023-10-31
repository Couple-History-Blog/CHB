// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';
import { IconCalendarHeart } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';
import ko from "../assets/language/ko.json";

const KOR_WEB_MESSAGE = ko['web']['list']['user'];

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics: IconDeviceAnalytics,
    IconCalendarHeart: IconCalendarHeart
};

// ==============================|| MENU ITEMS - COUPLE ||============================== //

const couple: NavItemType = {
    id: 'user-list',
    title: KOR_WEB_MESSAGE.groupTitle,
    type: 'group',
    children: [
        {
            id: 'user-profile',
            title: KOR_WEB_MESSAGE.ProfileTitle,
            type: 'item',
            url: '/profile/user',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
}

export default couple;