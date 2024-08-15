import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent  {
  activeElement: string;
  constructor() { }

  changesActiveAccordion(tabName: string) {
    this.activeElement = tabName;
  }

}
