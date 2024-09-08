import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./bugs.component').then(m => m.BugsComponent),
    data: {
      title: $localize`Bug Reports`
    }
  }
];

