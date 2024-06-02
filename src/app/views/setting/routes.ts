import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./setting.component').then(m => m.SettingComponent),
    data: {
      title: $localize`Setting`
    }
  }
];

