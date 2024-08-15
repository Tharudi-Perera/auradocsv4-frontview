import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalService} from "../../../services/modal-service/modal.service";

@Component({
  selector: 'app-user-account-template-table-form',
  templateUrl: './user-account-template-table-form.component.html',
  styleUrls: ['./user-account-template-table-form.component.css']
})
export class UserAccountTemplateTableFormComponent implements OnInit {
  title:string='The Areas of Personal_ID Template'
  templateTableDataForm:FormGroup
  templates:any[]
  constructor(private formBuilder:FormBuilder,private  modalService:ModalService) { }

  ngOnInit(): void {
    this.templateTableDataForm = this.formBuilder.group({

    })
    this.templates=[{
      number:73,
      image:'image'
    }]
    this.templates.forEach(jsonObject => {
      this.templateTableDataForm.addControl(jsonObject.number,this.formBuilder.control(''))
    })
  }


  onSubmit() {

  }

  closeModal() {
    this.modalService.emitChange(false,'user-account-template-table-modal')
  }
}
