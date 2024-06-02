import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: {name: 'cil-speedometer'},
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Users',
    url: '/users',
    iconComponent: {name: 'cilUser'},
  },
  {
    name: 'Categories',
    url: '/categories',
    iconComponent: {name: 'cilLayers'},
  },
  {
    name: 'Account Types',
    url: '/account-types',
    iconComponent: {name: 'cilList'},
  },
  {
    name: 'Settings',
    url: '/setting',
    iconComponent: {name: 'cilSettings'},
  }
  // {
  //   name: 'Game Setting',
  //   url: '/base',
  //   iconComponent: { name: 'cilSettings' },
  //   children: [
  //
  //   ]
  // }
];
