import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'subjects' },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./subjects/subjects.routes').then((r) => r.SUBJECTS_ROUTE),
  },
];

export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(routes);
