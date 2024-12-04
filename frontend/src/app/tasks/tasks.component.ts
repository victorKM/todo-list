import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Task } from './tasks';
import { TasksService } from './tasks.service';
import { AlertModalService } from '../shared/alert-modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalModule, RouterModule],
  providers: [BsModalService, AlertModalService],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  preserveWhitespaces: true,
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(
    private taskService: TasksService,
    private alertService: AlertModalService
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.tasks$ = this.taskService.list().pipe(
      catchError((error) => {
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger(
      'Error on loading tasks. Try again later!'
    );
  }
}
