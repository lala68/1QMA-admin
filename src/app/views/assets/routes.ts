import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./assets.component').then(m => m.AssetsComponent),
    data: {
      title: $localize`Assets`
    }
  }
];

