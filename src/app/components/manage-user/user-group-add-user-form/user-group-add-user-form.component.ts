import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-group-add-user-form',
  templateUrl: './user-group-add-user-form.component.html',
  styleUrls: ['./user-group-add-user-form.component.css']
})
export class UserGroupAddUserFormComponent implements OnInit {
  @Input() groupName: string;
  @Output() addUsers = new EventEmitter<boolean>()
  addUsersGroupForm: FormGroup;
  userList: any[];
  tableHeadings: any;
  users: any[]
  options = [10, 25, 50, 100];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.addUsersGroupForm = this.formBuilder.group({
      selectedUser: ''
    })
    this.userList = [{
      userId: 'Janitha Madubashana',
      userName: 'Janitha',
      email: 'madubashanajanitha@gmail.com'
    }];
    this.tableHeadings = ['User Id', 'User Name', 'Email', ''];
    this.users = [
      {
        dataNumber: 1,
        predefinedData: '3pl'
      },
      {
        dataNumber: 2,
        predefinedData: '3pl rest'
      }
    ]
  }

  onSubmit() {

  }

  removeUser() {

  }

  closeForm() {
    this.addUsers.emit(false)
  }
}
