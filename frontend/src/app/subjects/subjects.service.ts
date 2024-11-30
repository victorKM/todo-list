import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from './subjects';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private readonly API = 'http://localhost:8080/subjects';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Subject[]>(this.API).pipe(tap(console.log));
  }
}
