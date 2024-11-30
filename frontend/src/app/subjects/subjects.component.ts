import { Component, OnInit } from '@angular/core';
import { Subject } from './subjects';
import { SubjectsService } from './subjects.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, EMPTY, Observable, Subject as SubjectRXJS } from 'rxjs';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ModalModule],
  providers: [BsModalService],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent implements OnInit {
  subjects$: Observable<Subject[]>;
  error$ = new SubjectRXJS<boolean>();
  bsModalRef?: BsModalRef;

  constructor(
    private subjectService: SubjectsService,
    private modalService: BsModalService
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

    this.subjectService
      .list()
      .pipe(catchError((error) => EMPTY))
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }

  handleError() {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message =
      'Error on loading subjects. Try again later.';
  }
}
