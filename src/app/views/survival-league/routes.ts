import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./survival-league.component').then(m => m.SurvivalLeagueComponent),
    data: {
      title: $localize`Survival League`
    }
  }
];

