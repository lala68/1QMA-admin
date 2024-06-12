import {Routes} from '@angular/router';
import {DefaultLayoutComponent} from './layout';
import {authGuard} from "./auth.guard";
import {AuthRedirectGuard} from "./auth-redirect.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./views/edit-profile/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'categories',
        loadChildren: () => import('./views/categories/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'account-types',
        loadChildren: () => import('./views/account-types/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'setting',
        loadChildren: () => import('./views/setting/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'user-detail',
        loadChildren: () => import('./views/user-detail/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },


      // {
      //   path: 'widgets',
      //   loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'charts',
      //   loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      // },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [AuthRedirectGuard] // Apply the new guard here

  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  // {path: '**', redirectTo: 'login'}
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

];
