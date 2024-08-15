import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../../services/modal-service/modal.service";

@Component({
  selector: 'app-delete-masking-form',
  templateUrl: './delete-masking-form.component.html',
  styleUrls: ['./delete-masking-form.component.css']
})
export class DeleteMaskingFormComponent implements OnInit {
  constructor(private  modalService:ModalService) { }

  ngOnInit(): void {
  }

  // closeModal() {
  //   this.modalService.emitChange(false,'delete-masking-modal')
  // }

  onSubmit() {

  }
}
