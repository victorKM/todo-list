import { Component, OnInit, ViewChild } from '@angular/core';
import {
  catchError,
  EMPTY,
  Observable,
  Subject as SubjectRXJS,
  switchMap,
  take,
} from 'rxjs';
import { Task } from './tasks';
import { TasksService } from './tasks.service';
import { AlertModalService } from '../shared/alert-modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
  error$ = new SubjectRXJS<boolean>();
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  selectedTask: Task;

  constructor(
    private taskService: TasksService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
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

  onEdit(taskId: number) {
    this.router.navigate(['edit', taskId], { relativeTo: this.route });
  }

  onVisualize(taskId: number) {
    this.router.navigate([taskId], { relativeTo: this.route });
  }

  onDelete(task: any) {
    this.selectedTask = task;

    const result$ = this.alertService.showConfirm(
      'Confirmation',
      'Are you sure you want to remove this task'
    );

    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.taskService.remove(task.id) : EMPTY
        )
      )
      .subscribe({
        next: (success) => {
          this.alertService.showAlertSuccess('Task deleted!');
          this.onRefresh();
        },
        error: (error) => {
          this.alertService.showAlertDanger(
            'Error in delete task. Try again later!'
          );
        },
      });
  }
}
