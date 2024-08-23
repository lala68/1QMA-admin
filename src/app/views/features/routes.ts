import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features.component').then(m => m.FeaturesComponent),
    data: {
      title: $localize`Features`
    }
  }
];

