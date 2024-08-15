import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../../services/modal-service/modal.service";

@Component({
  selector: 'app-deactivate-security-group-form',
  templateUrl: './deactivate-security-group-form.component.html',
  styleUrls: ['./deactivate-security-group-form.component.css']
})
export class DeactivateSecurityGroupFormComponent implements OnInit {

  constructor(private  modalService:ModalService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.emitChange(false,'deactivate-security-group-modal')
  }

  onSubmit() {

  }
}
