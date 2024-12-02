import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const TASKS_ROUTE: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./tasks.component').then((c) => c.TasksComponent),
  },
];

export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(TASKS_ROUTE);
