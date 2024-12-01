import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from './subjects';
import { SubjectsService } from './subjects.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  catchError,
  EMPTY,
  Observable,
  Subject as SubjectRXJS,
  switchMap,
  take,
} from 'rxjs';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { AlertModalService } from '../shared/alert-modal.service';
import { Subjects2Service } from './subjects2.service';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ModalModule],
  providers: [BsModalService, AlertModalService],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
  preserveWhitespaces: true,
})
export class SubjectsComponent implements OnInit {
  subjects$: Observable<Subject[]>;
  error$ = new SubjectRXJS<boolean>();
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  selectedSubject: Subject;

  constructor(
    // private subjectService: SubjectsService,
    private subjectService: Subjects2Service,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
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

  onEdit(subjectId: number) {
    this.router.navigate(['edit', subjectId], { relativeTo: this.route });
  }

  onVisualize(subjectId: number) {
    this.router.navigate([subjectId], { relativeTo: this.route });
  }

  onDelete(subject: any) {
    this.selectedSubject = subject;

    const result$ = this.alertService.showConfirm(
      'Confirmation',
      'Are you sure you want to remove this subject'
    );

    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.subjectService.remove(subject.id) : EMPTY
        )
      )
      .subscribe({
        next: (success) => {
          this.alertService.showAlertSuccess('Subject deleted!');
          this.onRefresh();
        },
        error: (error) => {
          this.alertService.showAlertDanger(
            'Error in delete subject. Try again later!'
          );
        },
      });
  }
}
