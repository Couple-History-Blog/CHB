// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';
import { IconCalendarHeart, IconHeartSearch } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';
import ko from "../assets/language/ko.json";

const KOR_WEB_MESSAGE = ko['web']['list']['couple'];

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics: IconDeviceAnalytics,
    IconHeartSearch: IconHeartSearch,
    IconCalendarHeart: IconCalendarHeart
};


// ==============================|| MENU ITEMS - COUPLE ||============================== //

const couple: NavItemType = {
    id: 'couple-list',
    title: KOR_WEB_MESSAGE.groupTitle,
    type: 'group',
    children: [
        {
            id: 'apply-couple-account',
            title: KOR_WEB_MESSAGE.applyCoupleAccountTitle,
            type: 'item',
            url: '/apply-couple-account',
            icon: icons.IconHeartSearch,
            breadcrumbs: false
        },
        {
            id: 'date-schedule',
            title: KOR_WEB_MESSAGE.dateScheduleTitle,
            type: 'item',
            url: '/date/schedule',
            icon: icons.IconCalendarHeart,
            breadcrumbs: false
        },
        {
            id: 'couple-profile',
            title: KOR_WEB_MESSAGE.ProfileTitle,
            type: 'item',
            url: '/profile/couple',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
}

export default couple;