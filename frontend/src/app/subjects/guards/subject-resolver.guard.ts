import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { SubjectsService } from '../subjects.service';
import { of } from 'rxjs';

type SubjectEditOrNewTypes = {
  id: number | null;
  name: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class SubjectResolverGuard implements Resolve<SubjectEditOrNewTypes> {
  constructor(private subjectService: SubjectsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<SubjectEditOrNewTypes> {
    if (route.params && route.params['id']) {
      return this.subjectService.loadById(route.params['id']);
    }

    return of({
      id: null,
      name: null,
    });
  }
}
