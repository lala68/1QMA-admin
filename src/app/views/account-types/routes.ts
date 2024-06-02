import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./account-types.component').then(m => m.AccountTypesComponent),
    data: {
      title: $localize`Account Type`
    }
  }
];

