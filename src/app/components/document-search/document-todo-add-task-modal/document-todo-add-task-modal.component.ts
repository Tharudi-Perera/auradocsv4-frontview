import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-document-todo-add-task-modal',
  templateUrl: './document-todo-add-task-modal.component.html',
  styleUrls: ['./document-todo-add-task-modal.component.css']
})
export class DocumentTodoAddTaskModalComponent implements OnInit {
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
