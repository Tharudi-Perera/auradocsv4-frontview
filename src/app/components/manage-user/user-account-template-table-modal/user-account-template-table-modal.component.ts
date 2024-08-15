import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-user-account-template-table-modal',
  templateUrl: './user-account-template-table-modal.component.html',
  styleUrls: ['./user-account-template-table-modal.component.css']
})
export class UserAccountTemplateTableModalComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() toggleActive = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  toggleView() {

    this.isOpen = !this.isOpen;
    this.toggleActive.emit(this.isOpen)
  }

}
