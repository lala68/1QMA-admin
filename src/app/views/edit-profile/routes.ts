import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./edit-profile.component').then(m => m.EditProfileComponent),
    data: {
      title: $localize`Profile`
    }
  }
];

