import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject as SubjectRXJS } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string;
  @Input() body: string;
  @Input() cancelTxt = 'Cancel';
  @Input() confirmTxt = 'Confirm';

  confirmResult: SubjectRXJS<boolean>;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.confirmResult = new SubjectRXJS();
  }

  onClose() {
    this.confirmAndClose(false);
  }

  onConfirm() {
    this.confirmAndClose(true);
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }
}
