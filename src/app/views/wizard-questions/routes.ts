import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./wizard-questions.component').then(m => m.WizardQuestionsComponent),
    data: {
      title: $localize`wizard-questions`
    }
  }
];

