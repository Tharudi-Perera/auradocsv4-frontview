import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalService} from "../../../services/modal-service/modal.service";

@Component({
  selector: 'app-document-todo-add-task-form',
  templateUrl: './document-todo-add-task-form.component.html',
  styleUrls: ['./document-todo-add-task-form.component.css']
})
export class DocumentTodoAddTaskFormComponent implements OnInit {
  addTaskFormGroup: FormGroup;
  typeOfUsers: any[];
  userGroupList: any[];

  constructor(private formBuilder:FormBuilder,private  modalService:ModalService) { }

  ngOnInit(): void {
    this.addTaskFormGroup=this.formBuilder.group({
      typeOfUsers:'',
      userGroupList:'',
      remark:''
    })
  }

  addTasks() {

  }

  closeModal() {
    this.modalService.emitChange(false,'todo-list-add-task-modal')
  }
}
