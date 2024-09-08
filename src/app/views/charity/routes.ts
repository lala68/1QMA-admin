import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./charity.component').then(m => m.CharityComponent),
    data: {
      title: $localize`Charity`
    }
  }
];

