import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectResolverGuard } from './guards/subject-resolver.guard';

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
    resolve: {
      subject: SubjectResolverGuard,
    },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./subjects-form/subjects-form.component').then(
        (c) => c.SubjectsFormComponent
      ),
    resolve: {
      subject: SubjectResolverGuard,
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./subjects-form/subjects-form.component').then(
        (c) => c.SubjectsFormComponent
      ),
    resolve: {
      subject: SubjectResolverGuard,
    },
  },
];

export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(SUBJECTS_ROUTE);
