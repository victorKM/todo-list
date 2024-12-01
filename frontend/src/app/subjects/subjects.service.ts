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

  loadById(id: number) {
    return this.http.get<Subject>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(subject: any) {
    return this.http.post(this.API, subject).pipe(take(1));
  }

  private update(subject: any) {
    return this.http.put(`${this.API}/${subject.id}`, subject).pipe(take(1));
  }

  save(subject: any) {
    if (subject.id) {
      return this.update(subject);
    }
    return this.create(subject);
  }

  remove(id: number) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
