import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalService} from "../../../../services/modal-service/modal.service";

@Component({
  selector: 'app-add-sign',
  templateUrl: './add-sign.component.html',
  styleUrls: ['./add-sign.component.css']
})
export class AddSignComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private modalService:ModalService) { }
  @Input() isVisible: boolean;
  addSignForm: FormGroup;
  backgroundColor: string='#fdfbbc';
  ngOnInit(): void {
    this.addSignForm=this.formBuilder.group({
      billed:'',
      canceled:'',
      delivered:''
    })
  }

  addNoteFormSubmit() {

  }

  changeBackgroundColor(color: string) {
    this.backgroundColor=color
  }

  closeModal() {
    this.modalService.emitChange(false,'add-sign-form')
  }


}
