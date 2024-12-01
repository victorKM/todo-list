import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Subject } from './subjects';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Subjects2Service extends CrudService<Subject> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}subjects`);
  }
}
