import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {SummaryComponent} from "../../pages/summary/summary.component";
import {ManageUserComponent} from "../../pages/manage-user/manage-user.component";
import {ManageTemplateComponent} from "../../pages/manage-template/manage-template.component";

@Component({
  selector: 'app-admin-panel-buttons',
  templateUrl: './admin-panel-buttons.component.html',
  styleUrls: ['./admin-panel-buttons.component.css']
})
export class AdminPanelButtonsComponent implements AfterViewInit {
  @ViewChild('summaryButton', {static: true}) summaryButton:ElementRef;
  @ViewChild('manageUserButton', {static: true}) manageUserButton:ElementRef;
  @ViewChild('manageTemplateButton', {static: true}) manageTemplateButton:ElementRef;
  constructor(private route:ActivatedRoute) { }

  ngAfterViewInit() {
    let currentComponent=this.route.component;
    switch (currentComponent){
      case SummaryComponent:{
        this.summaryButton.nativeElement.style.backgroundColor='#ff7b08'
        break;
      }
      case ManageUserComponent:{
        this.manageUserButton.nativeElement.style.backgroundColor='#ff7b08'
        break;
      }
      case ManageTemplateComponent:{
        this.manageTemplateButton.nativeElement.style.backgroundColor='#ff7b08'
        break;
      }
    }
  }
}
