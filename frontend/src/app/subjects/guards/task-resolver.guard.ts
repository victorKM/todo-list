import { Injectable } from '@angular/core';
import { TasksService } from '../../tasks/tasks.service';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Subject } from '../subjects';
import { of } from 'rxjs';

type TaskEditOrNewTypes = {
  id: number | null;
  title: string | null;
  description: string | null;
  status: string | null;
  subject: Subject | null;
};

@Injectable({
  providedIn: 'root',
})
export class TaskResolverGuard implements Resolve<TaskEditOrNewTypes> {
  constructor(private taskService: TasksService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<TaskEditOrNewTypes> {
    if (route.params && route.params['id']) {
      return this.taskService.loadById(route.params['id']);
    }

    return of({
      id: null,
      title: null,
      description: null,
      status: null,
      subject: null,
    });
  }
}
