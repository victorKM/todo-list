import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskResolverGuard } from './guards/task-resolver.guard';

export const TASKS_ROUTE: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./tasks.component').then((c) => c.TasksComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./tasks-form/tasks-form.component').then(
        (c) => c.TasksFormComponent
      ),
    resolve: {
      task: TaskResolverGuard,
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./tasks-form/tasks-form.component').then(
        (c) => c.TasksFormComponent
      ),
    resolve: {
      task: TaskResolverGuard,
    },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./tasks-form/tasks-form.component').then(
        (c) => c.TasksFormComponent
      ),
    resolve: {
      task: TaskResolverGuard,
    },
  },
];

export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(TASKS_ROUTE);
