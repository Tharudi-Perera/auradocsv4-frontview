import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdminApiService} from "../../../services/admin/admin-api.service";
import {Masking} from "../../../models/Masking.model";
import {NEW_MASKING} from "../../../utility/message-alerts.utility";
import {PnotifyService} from "../../../services/pnotify/pnotify.service";

@Component({
  selector: 'app-new-masking-form',
  templateUrl: './new-masking-form.component.html',
  styleUrls: ['./new-masking-form.component.css']
})
export class NewMaskingFormComponent implements OnInit {
  newMaskingForm: FormGroup;
  templates = [];
  files = [];

  constructor(private formBuilder: FormBuilder, private adminApiService: AdminApiService, private pnotifyService: PnotifyService) {
  }

  ngOnInit(): void {
    this.newMaskingForm = this.formBuilder.group({
      nameOfArea: '',
      selectTemplate: '',
      selectFile: ''
    })

    this.adminApiService.getTemplates('EDIT').subscribe({
      next: data => {
        data.data.forEach((json) => {
          this.templates.push({dataNumber: json.id, predefinedData: json.name});
        });

      },
      error: error => {
        this.pnotifyService.error({
          message: error.message,
          title: error.name,
          hasConfirm: false
        })
      }
    })


  }

  onSubmit() {
    let masking: Masking = {
      areaName: this.newMaskingForm.value['nameOfArea'],
      templateId: this.newMaskingForm.value['selectTemplate'],
      docId: this.newMaskingForm.value['selectFile'],
    }
    this.adminApiService.saveMasking(masking).subscribe({
      next: () => {
        this.pnotifyService.success({
          message: 'New Masking saved',
          title: NEW_MASKING,
          hasConfirm: false
        })
      },
      error: (error) => {
        this.pnotifyService.error({
          message: error.message,
          title: error.name,
          hasConfirm: false
        })
      }
    })

  }

  selectedTemplateChange() {
    let selectedTemplateId = this.newMaskingForm.value['selectTemplate'];
    this.adminApiService.getTemplateRelatedFiles(selectedTemplateId).subscribe({
      next: data => {
        data.data.forEach((json) => {
          this.files.push({dataNumber: json.docId, predefinedData: json.name});
        });
      },
      error: error => {
        this.pnotifyService.error({
          message: error.message,
          title: error.name,
          hasConfirm: false
        })
      }
    })
  }

  selectedFileChange() {

  }

  @Output() newMaskingFormVisible = new EventEmitter<boolean>()

  closeForm() {
    this.newMaskingFormVisible.emit(false)
  }
}
