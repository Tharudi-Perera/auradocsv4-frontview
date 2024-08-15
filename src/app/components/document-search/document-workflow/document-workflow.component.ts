import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-document-workflow',
  templateUrl: './document-workflow.component.html',
  styleUrls: ['./document-workflow.component.css']
})
export class DocumentWorkflowComponent implements OnInit {
  @Input() isActive: boolean=false;
  documentWorkFlowAccordion="<i class='fa fa-briefcase'></i>  Workflow";

  constructor() { }

  ngOnInit(): void {
  }

}
