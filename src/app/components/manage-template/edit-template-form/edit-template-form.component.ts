import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalService} from "../../../services/modal-service/modal.service";

@Component({
  selector: 'app-edit-template-form',
  templateUrl: './edit-template-form.component.html',
  styleUrls: ['./edit-template-form.component.css']
})
export class EditTemplateFormComponent implements OnInit {

  newTemplateForm: FormGroup;
  templateDetails: any[];
  textTypes: any[];
  textFormat: any[];
  isDocumentRetentionPeriodChecked: boolean=false ;
  controlFields = [
    'fieldId', 'fieldName', 'textType', 'defaultValue',
    'maximumLength', 'textFormat', 'requiredYN', 'noDuplicate',
    'X', 'Y', 'W', 'H', 'page'
  ];
  constructor(private formBuilder: FormBuilder,private modalService:ModalService) {
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
      retentionPeriodInDays:''
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



    this.templateDetails.forEach(value => {
      this.controlFields.forEach(field => {
        if (field==='fieldId'){
          this.newTemplateForm.addControl(value[field], this.formBuilder.control(100));
        }else{
          this.newTemplateForm.addControl(value[field], this.formBuilder.control(''));
        }
      });
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


  onSubmit() {

  }



  addControlsForTemplateDetail(templateDetail: any) {
    const controlNames = [
      'fieldId', 'fieldName', 'textType', 'defaultValue',
      'maximumLength', 'textFormat', 'requiredYN', 'noDuplicate',
      'X', 'Y', 'W', 'H', 'page'
    ];

    for (const controlName of controlNames) {

      this.newTemplateForm.addControl(
        templateDetail[controlName],
        this.formBuilder.control(templateDetail[controlName])
      );
    }
  }

  addNewTemplateDetailsRow() {
    const newTemplateDetail = {
      fieldId: this.templateDetails[this.templateDetails.length - 1].fieldId + 1,
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
    };

    this.templateDetails.push(newTemplateDetail);
    this.addControlsForTemplateDetail(newTemplateDetail);
  }


  deleteNewTemplateDetailsRow(value: any) {
    const index = this.templateDetails.findIndex(item => item.fieldId == value);
    if(this.templateDetails.length===1) return;
    this.templateDetails.splice(index, 1);
  }


  closeModal() {
    this.modalService.emitChange(false,'edit-template-modal')
  }

  onDocumentRetentionPeriodChange() {
    const documentRetentionPeriodControl = this.newTemplateForm.get('documentRetentionPeriod');
    this.isDocumentRetentionPeriodChecked = documentRetentionPeriodControl.value === true;
  }

}
