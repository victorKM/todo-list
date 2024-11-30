import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const SUBJECTS_ROUTE: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./subjects.component').then((c) => c.SubjectsComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./subjects-form/subjects-form.component').then(
        (c) => c.SubjectsFormComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./subjects-form/subjects-form.component').then(
        (c) => c.SubjectsFormComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./subjects-form/subjects-form.component').then(
        (c) => c.SubjectsFormComponent
      ),
  },
];

export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(SUBJECTS_ROUTE);
