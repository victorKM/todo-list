import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from './subjects';
import { take, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  //private readonly API = 'http://localhost:8080/subjects';
  private readonly API = `${environment.API}subjects`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Subject[]>(this.API).pipe(tap(console.log));
  }

  create(subject: any) {
    return this.http.post(this.API, subject).pipe(take(1));
  }
}
