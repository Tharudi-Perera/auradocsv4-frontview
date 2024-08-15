import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() isVisible: boolean;
  @Input() title: string;
  @Output() modal = new EventEmitter<boolean>();
  @Input() subtitle: string;
  @Input() headerClass: string;
  @Input() modalFooterVisible:boolean
  @Input() modalHeaderVisible:boolean
  @Input() modalDialogClass: any;
  @Input() modalWidth: any;
  @Input() innerHTML: any;
  @Input() modalTitleTextAlign: any;
  @Input() modalTitleTextClass: any;
  @Input() noBorderClass: boolean=false;
  constructor() { }

  ngOnInit(): void {

  }

  closeModal() {
    this.modal.emit(!this.isVisible);
  }
}
