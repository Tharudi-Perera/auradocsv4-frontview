import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RequestFileService} from "../../../../services/request-file/request-file.service";
import {PnotifyService} from "../../../../services/pnotify/pnotify.service";

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  @Input() isActive: boolean=false;
  @Input() templateId:number;
  @Output() closeEditDetailsAccordion=new EventEmitter<boolean>();
  editDetailsAccordion="<i class='fa fa-pencil-square-o'></i> &nbsp; Edit Document";
  clickedButton: string
  formAttributes: any;
  indexForm: FormGroup;
  previouslySelectedAccessLevel: any
  templateAccessRight:string;
  @Input() documentName: string;
  constructor(private formBuilder: FormBuilder,
              private requestFileService: RequestFileService,
              private pnotifyService: PnotifyService,) { }

  ngOnInit(): void {
    this.indexForm = this.formBuilder.group({
      accessLevel: 'P',
    })
    this.requestFileService.getTemplateForm(this. templateId).subscribe({
      next: (data) => {
        this.formAttributes = data.data.indexes;
        this.clickedButton = this.templateAccessRight=data.data.accessRight;
        this.indexForm.controls['accessLevel'].setValue(data.data.accessRight);
        this.formAttributes.forEach((field: any) => {
          this.indexForm.addControl(field.indexFieldName, this.formBuilder.control(''));
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

  onAccessLevelClick(data: string): void {
    this.clickedButton = data
    this.indexForm.controls['accessLevel'].setValue(data);
    this.previouslySelectedAccessLevel = this.indexForm.controls['accessLevel'].value
  }

  onImageAreaClick($event: MouseEvent) {

  }

  onSubmit() {

  }


  cancel() {
    this.closeEditDetailsAccordion.emit(false);
  }
}
