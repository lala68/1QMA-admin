import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-detail.component').then(m => m.UserDetailComponent),
    data: {
      title: $localize`User`
    }
  }
];

