import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./bundles.component').then(m => m.BundlesComponent),
    data: {
      title: $localize`Bundles`
    }
  }
];

