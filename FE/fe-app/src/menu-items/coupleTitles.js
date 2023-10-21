// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import { IconCalendarHeart } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconCalendarHeart
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const CoupleTitles = {
  id: 'utilities',
  title: '데이트 관련 페이지',
  type: 'group',
  children: [
    {
      id: 'util-coupleCalendar',
      title: '데이트 일정',
      type: 'item',
      url: '/utils/coupleCalendar',
      icon: icons.IconCalendarHeart,
      breadcrumbs: false
    },
    {
      id: 'util-typography',
      title: 'Typography',
      type: 'item',
      url: '/utils/util-typography',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'Icons',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'tabler-icons',
          title: 'Tabler Icons',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'material-icons',
          title: 'Material Icons',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default CoupleTitles;
