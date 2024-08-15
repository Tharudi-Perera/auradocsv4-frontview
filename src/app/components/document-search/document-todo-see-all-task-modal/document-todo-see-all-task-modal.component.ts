import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from "../../../services/modal-service/modal.service";

@Component({
  selector: 'app-document-todo-see-all-task-modal',
  templateUrl: './document-todo-see-all-task-modal.component.html',
  styleUrls: ['./document-todo-see-all-task-modal.component.css']
})
export class DocumentTodoSeeAllTaskModalComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() toggleActive = new EventEmitter<boolean>();
  constructor(private modalService:ModalService) { }

  ngOnInit(): void {
  }
  toggleView() {

    this.isOpen = !this.isOpen;
    this.toggleActive.emit(this.isOpen)
  }

  closeModal() {
    this.modalService.emitChange(false,'todo-list-see-all-task-modal')
  }
}
