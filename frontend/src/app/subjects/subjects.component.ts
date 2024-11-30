import { Component, OnInit } from '@angular/core';
import { Subject } from './subjects';
import { SubjectsService } from './subjects.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, EMPTY, Observable, Subject as SubjectRXJS } from 'rxjs';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { AlertModalService } from '../shared/alert-modal.service';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ModalModule],
  providers: [BsModalService, AlertModalService],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent implements OnInit {
  subjects$: Observable<Subject[]>;
  error$ = new SubjectRXJS<boolean>();
  bsModalRef?: BsModalRef;

  constructor(
    private subjectService: SubjectsService,
    private alertService: AlertModalService
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.subjects$ = this.subjectService.list().pipe(
      catchError((error) => {
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger(
      'Error on loading subjects. Try again later!'
    );
  }
}
