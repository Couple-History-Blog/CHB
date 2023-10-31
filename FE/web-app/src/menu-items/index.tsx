import dashboard from './dashboard';
import application from './application';
import forms from './forms';
import elements from './elements';
import pages from './pages';
import utilities from './utilities';
import support from './support';
import other from './other';
import couple from './couple';
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [dashboard, couple, application, forms, elements, pages, utilities, support, other]
};

export default menuItems;
