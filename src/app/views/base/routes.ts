import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full'
      },
      {
        path: 'categories',
        loadComponent: () => import('../categories/categories.component').then(m => m.CategoriesComponent),
        data: {
          title: 'Categories'
        }
      },
      {
        path: 'account-types',
        loadComponent: () => import('../account-types/account-types.component').then(m => m.AccountTypesComponent),
        data: {
          title: 'Account Types'
        }
      },
      {
        path: 'setting',
        loadComponent: () => import('../setting/setting.component').then(m => m.SettingComponent),
        data: {
          title: 'Settings'
        }
      },
    ]
  }
];


