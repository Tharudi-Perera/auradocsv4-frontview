import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalService} from "../../../services/modal-service/modal.service";
import {MstTemplate} from "../../../models/Mst-template.model";
import {AdminApiService} from "../../../services/admin/admin-api.service";

@Component({
  selector: 'app-new-template-form',
  templateUrl: './new-template-form.component.html',
  styleUrls: ['./new-template-form.component.css']
})
export class NewTemplateFormComponent implements OnInit, AfterViewInit {
  newTemplateForm: FormGroup;
  templateDetails: any[];
  textTypes: any[];
  textFormat: any[];
  isDocumentRetentionPeriodChecked: boolean = false;
  isAccessLevelChecked: boolean = false;
  controlFields = [
    'fieldId', 'fieldName', 'textType', 'defaultValue',
    'maximumLength', 'textFormat', 'requiredYN', 'noDuplicate',
    'X', 'Y', 'W', 'H', 'page'
  ];

  constructor(private formBuilder: FormBuilder, private modalService: ModalService, private adminApiService: AdminApiService) {
  }

  ngOnInit(): void {
    this.newTemplateForm = this.formBuilder.group({
      accessLevel: '',
      templateName: '',
      autoIndexing: '',
      email: '',
      folderPath: '',
      download: '',
      defaultFolderPath: '',
      ocr: '',
      emailAlert: '',
      encrypt: '',
      otp: '',
      print: '',
      folderIndex: '',
      blockChain: '',
      annotation: '',
      documentRetentionPeriod: false,
      retentionPeriodInDays: ''
    })
    this.templateDetails = [{
      fieldId: 100,
      fieldName: '',
      textType: '',
      defaultValue: '',
      maximumLength: '',
      textFormat: '',
      requiredYN: '',
      noDuplicate: '',
      X: '',
      Y: '',
      W: '',
      H: '',
      page: ''
    }]
    this.templateDetails.forEach(templateDetail => {
      const groupId = templateDetail.fieldId.toString();
      const group = this.formBuilder.group({});
      this.controlFields.forEach(field => {
        group.addControl(field, this.formBuilder.control(templateDetail[field]));
      });
      this.newTemplateForm.addControl(groupId, group);
    });

    this.textTypes = [
      {dataNumber: 0, predefinedData: 'Predefined Data'},
      {dataNumber: 1, predefinedData: 'Single Line Text'},
      {dataNumber: 2, predefinedData: 'Multi Line text'},
      {dataNumber: 3, predefinedData: 'Image Area'},
      {dataNumber: 4, predefinedData: 'Data'},
      {dataNumber: 5, predefinedData: 'Check-Box'},
      {dataNumber: 6, predefinedData: 'File Name as Value',},
      {dataNumber: 7, predefinedData: 'Folder Name as Value'},
      {dataNumber: 8, predefinedData: 'Barcode'},
      {dataNumber: 9, predefinedData: 'QR Code Value'},
      {dataNumber: 10, predefinedData: 'OCR Value'},
      {dataNumber: 11, predefinedData: 'Bulk'},
      {dataNumber: 12, predefinedData: 'Disabled'}
    ];
    this.textFormat = [
      {dataNumber: 0, predefinedData: 'Alphanumeric'},
      {dataNumber: 1, predefinedData: 'ALL CAPITAL'},
      {dataNumber: 2, predefinedData: 'all simple'},
      {dataNumber: 3, predefinedData: 'Start Capital'},
      {dataNumber: 4, predefinedData: 'Numbers Only'}
    ];
  }

  ngAfterViewInit() {
    let buttons = Array.from(
      document.getElementsByClassName('buttonColor') as HTMLCollectionOf<HTMLElement>,
    );
    // change button color when clicked
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(otherButton => {
          if (otherButton != button) {
            otherButton.style.backgroundColor = '#595f69'
          } else {
            button.style.backgroundColor = '#ff7b08'
          }
        })

      })

    })
  }

  onSubmit() {
    let mstTemplate: MstTemplate = {
      name: this.newTemplateForm.get('templateName').value,
      zoomYn: this.newTemplateForm.get('ocr').value,
      indexingYn: this.newTemplateForm.get('autoIndexing').value,
      emailYn: this.newTemplateForm.get('email').value,
      downloadYn: this.newTemplateForm.get('download').value,
      watermarkYn: null,
      encryptYn: this.newTemplateForm.get('encrypt').value,
      docAlertSMS: null,
      docAlertEmail: this.newTemplateForm.get('emailAlert').value,
      printYn: this.newTemplateForm.get('print').value,
      folderIndex: this.newTemplateForm.get('folderIndex').value,
      blockchain: this.newTemplateForm.get('blockChain').value,
      annotation: this.newTemplateForm.get('annotation').value,
      confirmYn: null,
      workflowYn: null,
      retentionDays: this.newTemplateForm.get('retentionPeriodInDays').value,
      folderPath: this.newTemplateForm.get('folderPath').value,
      fields: (() => {
        let result = [];
        this.templateDetails.forEach(json => {
          result.push({
            fieldId: this.newTemplateForm.get([json['fieldId']]).get('fieldId').value,
            fieldName: this.newTemplateForm.get([json['fieldId']]).get('fieldName').value,
            textType: this.newTemplateForm.get([json['fieldId']]).get('textType').value,
            defaultValue: this.newTemplateForm.get([json['fieldId']]).get('defaultValue').value,
            maximumLength: this.newTemplateForm.get([json['fieldId']]).get('maximumLength').value,
            textFormat: this.newTemplateForm.get([json['fieldId']]).get('textFormat').value,
            requiredYN: this.newTemplateForm.get([json['fieldId']]).get('requiredYN').value,
            noDuplicate: this.newTemplateForm.get([json['fieldId']]).get('noDuplicate').value,
            X: this.newTemplateForm.get([json['fieldId']]).get('X').value,
            Y: this.newTemplateForm.get([json['fieldId']]).get('Y').value,
            W: this.newTemplateForm.get([json['fieldId']]).get('W').value,
            H: this.newTemplateForm.get([json['fieldId']]).get('H').value,
            page: this.newTemplateForm.get([json['fieldId']]).get('page').value,
          });
        });
        return result;
      })(),
    }
    this.adminApiService.saveMstTemplate(mstTemplate)
  }

  addControlsForTemplateDetail(templateDetail: any) {

    const groupId = templateDetail.fieldId.toString();
    const group = this.formBuilder.group({});
    this.controlFields.forEach(field => {
      group.addControl(field, this.formBuilder.control(templateDetail[field]));
    });
    this.newTemplateForm.addControl(groupId, group);

  }

  addNewTemplateDetailsRow() {
    const newTemplateDetail = {
      fieldId: this.templateDetails[this.templateDetails.length - 1].fieldId + 1,
      ...this.templateDetails
    };

    this.templateDetails.push(newTemplateDetail);
    this.addControlsForTemplateDetail(newTemplateDetail);
  }


  deleteNewTemplateDetailsRow(value: any) {
    const index = this.templateDetails.findIndex(item => item.fieldId == value);
    if (this.templateDetails.length === 1) return;
    this.templateDetails.splice(index, 1);
  }


  closeModal() {
    this.modalService.emitChange(false, 'new-template-modal')
  }

  onDocumentRetentionPeriodChange() {
    const documentRetentionPeriodControl = this.newTemplateForm.get('documentRetentionPeriod');
    this.isDocumentRetentionPeriodChecked = documentRetentionPeriodControl.value === true;
  }

  onAccessLevelChange() {
    const accessLevelControl = this.newTemplateForm.get('accessLevel');
    this.isAccessLevelChecked = accessLevelControl.value === true;
  }

  onPublicAccessClick() {

  }

  onPrivateAccessClick() {

  }

  onGroupAccessClick() {

  }
}
