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
    name: 'Shop',
    url: '/shop',
    iconComponent: {name: 'cilCart'},
    children: [{
      name: 'Features',
      url: '/features',
    },
      {
        name: 'Asset',
        url: '/assets',
      },
      {
        name: 'Bundles',
        url: '/bundles',
      }
    ]
  },
  {
    name: 'Wizard questions',
    url: '/wizard-questions',
    iconComponent: {name: 'cilList'},
  },
  {
    name: 'Bugs',
    url: '/bugs',
    iconComponent: {name: 'cilBug'},
    children: [{
      name: 'Reports',
      url: '/bugs',
    },
      {
        name: 'Setting',
        url: '/bug-types',
      }
    ]
  },
  {
    name: 'Charity',
    url: '/charity',
    iconComponent: {name: 'cilGift'},
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
