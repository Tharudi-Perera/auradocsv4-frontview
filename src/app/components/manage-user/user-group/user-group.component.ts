import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit {
  @Input() isActive: boolean = true;
  title: string = "User Group"
  headings: string[];
  tableData: any[];
  options=[10,25,50,100];
  addUsers:boolean=false;


  constructor() { }

  ngOnInit(): void {
    this.headings = [
      'Group Id',
      'Group Name',
      'Status',
      ''
    ]
    this.tableData = [{
      groupId:'3plGroup',
      groupName:'testing',
      status:'Active'
    }]
  }

  addUsersInUserGroup() {
    this.addUsers=true
  }


  showAddUserForm(val: boolean) {
    this.addUsers=val;
  }
}
