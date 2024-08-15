import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-deactivate-security-group-modal',
  templateUrl: './deactivate-security-group-modal.component.html',
  styleUrls: ['./deactivate-security-group-modal.component.css']
})
export class DeactivateSecurityGroupModalComponent implements OnInit {
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
