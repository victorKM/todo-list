import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss',
})
export class AlertModalComponent implements OnInit {
  @Input() message: string;
  @Input() type = 'success';

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  onClose() {
    this.bsModalRef.hide();
  }
}
