import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Task } from './tasks';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly API = `${environment.API}tasks`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Task[]>(this.API).pipe(tap(console.log));
  }

  loadById(id: number) {
    return this.http.get<Task>(`${this.API}/${id}`).pipe(take(1));
  }

  create(task: any) {
    return this.http.post(this.API, task).pipe(take(1));
  }
}
