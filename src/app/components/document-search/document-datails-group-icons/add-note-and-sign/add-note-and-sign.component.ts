import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from "../../../../services/modal-service/modal.service";

@Component({
  selector: 'app-add-note-and-sign',
  templateUrl: './add-note-and-sign.component.html',
  styleUrls: ['./add-note-and-sign.component.css']
})
export class AddNoteAndSignComponent implements OnInit {
  @Input() isVisible: boolean;
  @Output() sendAddNoteModalSignal=new EventEmitter<boolean>()
  constructor(private modalService:ModalService) { }

  ngOnInit(): void {
  }

  openAddNotModal() {
    this.modalService.emitChange(true,'add-note-form');
    this.modalService.emitChange(false,'Add-Note-Sign');
  }

  openAddSignModal() {
    this.modalService.emitChange(true,'add-note-form');
    this.modalService.emitChange(false,'Add-Note-Sign');
  }
}
