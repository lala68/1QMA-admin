import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./gifts.component').then(m => m.GiftsComponent),
    data: {
      title: $localize`Gifts`
    }
  }
];

