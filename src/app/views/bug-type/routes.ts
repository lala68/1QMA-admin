import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./bug-type.component').then(m => m.BugTypeComponent),
    data: {
      title: $localize`Bug Types`
    }
  }
];

