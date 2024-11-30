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
import { SubjectsService } from '../subjects.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-subjects-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ErrorMsgComponent],
  providers: [AlertModalService, BsModalService],
  templateUrl: './subjects-form.component.html',
  styleUrl: './subjects-form.component.scss',
})
export class SubjectsFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectsService,
    private modal: AlertModalService,
    private location: Location
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.subjectService.create(this.form.value).subscribe({
        next: (success) => {
          this.modal.showAlertSuccess('Successfully created!');
          setTimeout(() => {
            this.location.back();
          }, 3000);
        },
        error: (error) =>
          this.modal.showAlertDanger('Error in create new subject, try again!'),
        complete: () => console.log('request completed'),
      });
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
