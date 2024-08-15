import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-forword-to-user-modal',
  templateUrl: './forword-to-user-modal.component.html',
  styleUrls: ['./forword-to-user-modal.component.css']
})
export class ForwordToUserModalComponent implements OnInit {
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
