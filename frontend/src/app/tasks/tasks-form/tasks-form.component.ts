import { Subject } from './../../subjects/subjects';
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMsgComponent } from '../../shared/error-msg/error-msg.component';
import { AlertModalService } from '../../shared/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../tasks.service';
import { SubjectsService } from '../../subjects/subjects.service';

@Component({
  selector: 'app-tasks-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ErrorMsgComponent],
  providers: [AlertModalService, BsModalService],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.scss',
})
export class TasksFormComponent implements OnInit {
  form: FormGroup;
  method: string;
  submitted = false;
  subjects: Subject[];
  statuses = ['TODO', 'DOING', 'DONE'];

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private subjectService: SubjectsService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const task = this.route.snapshot.data['task'];
    let taskStatus = task.id ? task.status : 'TODO';

    this.subjectService.list().subscribe((data) => (this.subjects = data));

    this.form = this.fb.group({
      id: [task.id],
      title: [task.title, [Validators.required]],
      description: [task.description],
      status: [taskStatus],
      subject: [task.subject, Validators.required],
    });

    this.route.url.subscribe((url) => {
      if (url[0].path === 'new') {
        this.method = 'post';
      } else if (url[0].path === 'edit') {
        this.method = 'edit';
      } else {
        this.method = 'visualize';
      }
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      let successMsg = 'Task was created!';
      let errorMsg = 'Error in create a new task, try again!';

      if (this.form.value.id) {
        successMsg = 'Task was updated!';
        errorMsg = 'Error in update the task, try again!';
      }

      this.taskService.save(this.form.value).subscribe({
        next: (sucess) => {
          this.modal.showAlertSuccess(successMsg);
          setTimeout(() => {
            this.location.back();
          }, 3000);
        },
        error: (error) => this.modal.showAlertDanger(errorMsg),
      });
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  compareSubjects(subject1: Subject, subject2: Subject): boolean {
    return subject1 && subject2
      ? subject1.id === subject2.id
      : subject1 === subject2;
  }
}
