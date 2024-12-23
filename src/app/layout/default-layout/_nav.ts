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
    name: 'Gifts',
    url: '/gifts',
    iconComponent: {name: 'cilList'},
  },
  {
    name: 'Wizard questions',
    url: '/wizard-questions',
    iconComponent: {name: 'cilList'},
  },
  {
    name: 'FAQ',
    url: '/faq',
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
        name: 'Bug Types',
        url: '/bug-types',
      }
    ]
  },
  {
    name: 'Sponsors',
    url: '/sponsors',
    iconComponent: {name: 'cilList'},
  },
  {
    name: 'Charity',
    url: '/charity',
    iconComponent: {name: 'cilGift'},
  },
  {
    name: 'Survival League',
    url: '/survival-league',
    iconComponent: {name: 'cibPlaystation'},
  },
  {
    name: 'Settings',
    url: '/setting',
    iconComponent: {name: 'cilSettings'},
  },
  {
    name: 'Terms Of Service',
    url: '/terms',
    iconComponent: {name: 'cilInbox'},
  },
  {
    name: 'Privacy & Policy',
    url: '/privacy',
    iconComponent: {name: 'cilInbox'},
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
