import { Component, OnInit } from '@angular/core';
import { Subject } from './subjects';
import { SubjectsService } from './subjects.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, EMPTY, Observable, Subject as SubjectRXJS } from 'rxjs';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent implements OnInit {
  subjects$: Observable<Subject[]>;

  error$ = new SubjectRXJS<boolean>();

  constructor(private subjectService: SubjectsService) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.subjects$ = this.subjectService.list().pipe(
      catchError((error) => {
        this.error$.next(true);
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
}
