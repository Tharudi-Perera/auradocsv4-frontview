import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../services/modal-service/modal.service";

@Component({
  selector: 'app-template-creator',
  templateUrl: './template-creator.component.html',
  styleUrls: ['./template-creator.component.css']
})
export class TemplateCreatorComponent implements OnInit {
  @Input() isActive: boolean = true;
  title: string = "Template Creator"
  headings: string[];
  tableData=[{}];
  options=[10,25,50,100];
  isNewTemplateModalVisible = false;
  isEditTemplateModalVisible=false;
  constructor(private  modalService:ModalService) { }

  ngOnInit(): void {
    this.headings = [
      'Template Id',
      'Template Name',
      'Status',
      ''
    ]
    this.tableData = [{
      templateId:'297',
      templateName:'DoleTemplate',
      status:'Active'
    }]

  }
  toggleNewTemplate() {
    this.isNewTemplateModalVisible = !this.isNewTemplateModalVisible;
    this.modalService.emitChange(this.isNewTemplateModalVisible,'new-template-modal')
  }
  toggleEditTemplate() {
    this.isEditTemplateModalVisible = !this.isEditTemplateModalVisible;
    this.modalService.emitChange(this.isEditTemplateModalVisible,'edit-template-modal')
  }
}
