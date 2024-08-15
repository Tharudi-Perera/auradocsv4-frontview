import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-document-todo-see-all-task-form',
  templateUrl: './document-todo-see-all-task-form.component.html',
  styleUrls: ['./document-todo-see-all-task-form.component.css']
})
export class DocumentTodoSeeAllTaskFormComponent implements OnInit {
  documentApprovalHistoryHeadings=['Status','Document ID','Document Name','Requested By',
    'Requested Date','Remark','Approved By','Approved Date','Comment'];
  documentApprovalHistory: any[];

  constructor() { }

  ngOnInit(): void {
  }


}
