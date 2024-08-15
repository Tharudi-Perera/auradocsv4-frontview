import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from "../../../services/modal-service/modal.service";


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  @Input() isActive: boolean = true;
  title: string = "User Account"
  headings: string[];
  tableData=[{}];
  options=[10,25,50,100];
  isAddUsersModalVisible = false;
  isEditUserAccountGroupModalVisible=false;
  constructor(private  modalService:ModalService) { }

  ngOnInit(): void {
    this.headings = [
      'User Id',
      'User Name',
      'Email',
      'Status',
      ''
    ]
    this.tableData = [{
      userId:'3pl',
      userName:'Janitha',
      email:'madu@gmail.com',
      status:'Active'
    }]

  }
  toggleAddUsers() {
    this.isAddUsersModalVisible = !this.isAddUsersModalVisible;
    this.modalService.emitChange(this.isAddUsersModalVisible,'add-user-modal')
  }
  toggleEditUserAccountGroup() {
    this.isEditUserAccountGroupModalVisible = !this.isEditUserAccountGroupModalVisible;
    this.modalService.emitChange(this.isEditUserAccountGroupModalVisible,'edit-user-account-group-modal')
  }
}
