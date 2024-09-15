import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./terms.component').then(m => m.TermsComponent),
    data: {
      title: $localize`Terms`
    }
  }
];

