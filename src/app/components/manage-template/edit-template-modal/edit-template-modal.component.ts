import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit-template-modal',
  templateUrl: './edit-template-modal.component.html',
  styleUrls: ['./edit-template-modal.component.css']
})
export class EditTemplateModalComponent implements OnInit {
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
