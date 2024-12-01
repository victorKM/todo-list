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
import { ActivatedRoute } from '@angular/router';
import { Subjects2Service } from '../subjects2.service';

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
  edit = true;

  constructor(
    private fb: FormBuilder,
    //private subjectService: SubjectsService,
    private subjectService: Subjects2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const subject = this.route.snapshot.data['subject'];

    this.form = this.fb.group({
      id: [subject.id],
      name: [
        subject.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });

    this.route.url.subscribe((url) => {
      this.edit = url[0].path === 'edit' || url[0].path === 'new';
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      let successMsg = 'Subject was created!';
      let errorMsg = 'Error in create a new subject, try again!';

      if (this.form.value.id) {
        successMsg = 'Subject was updated!';
        errorMsg = 'Error in update the subject, try again!';
      }

      this.subjectService.save(this.form.value).subscribe({
        next: (success) => {
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
}
