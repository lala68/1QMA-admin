import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./sponsores.component').then(m => m.SponsoresComponent),
    data: {
      title: $localize`Sponsors`
    }
  }
];

