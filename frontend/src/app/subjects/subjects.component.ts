import { Component, OnInit } from '@angular/core';
import { Subject } from './subjects';
import { SubjectsService } from './subjects.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[];

  constructor(private subjectService: SubjectsService) {}

  ngOnInit() {
    this.subjectService.list().subscribe((data) => (this.subjects = data));
  }
}
