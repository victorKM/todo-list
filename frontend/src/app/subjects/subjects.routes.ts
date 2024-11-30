import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const SUBJECTS_ROUTE: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./subjects.component').then((c) => c.SubjectsComponent),
  },
];

export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(SUBJECTS_ROUTE);
