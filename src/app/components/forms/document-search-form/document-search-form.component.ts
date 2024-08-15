import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestFileService} from "../../../services/request-file/request-file.service";

@Component({
  selector: 'app-document-search-form',
  templateUrl: './document-search-form.component.html',
  styleUrls: ['./document-search-form.component.css']
})
export class DocumentSearchFormComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
  docSearchForm : FormGroup;
  templates: any=[];
  type: string;
  formAttributes: any;
  optionValueOfTemplates:string;
  id:number
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private requestFileService: RequestFileService,
  ) {this.optionValueOfTemplates="-Select Template Option-" }
  ngOnInit(): void {

    this.docSearchForm = this.formBuilder.group({
      anyword: '',
      allwords: '',
      documentStart:'',
      documentEnd: '',
      dateStart: '',
      dateEnd: '',
      template: '',
      isPrivateDocument: false,
      isInTrash: false,
      templateForm : this.formBuilder.group({
      })
    })
    this.requestFileService.getTemplates().subscribe({
      next: data => {
        this.templates = data.data
      },
      error: error => console.log(error)
    })

  }

  onSubmit() {

    const queryParams: any = {
      isAdvanced: true,
      anyword: this.docSearchForm.get('anyword').value ? this.docSearchForm.get('anyword').value.trim() : 'all',
      allwords: this.docSearchForm.get('allwords').value ? this.docSearchForm.get('allwords').value.trim() : 'all',
      documentStart: this.docSearchForm.get('documentStart').value ? this.docSearchForm.get('documentStart').value.trim() : '0',
      documentEnd: this.docSearchForm.get('documentEnd').value ? this.docSearchForm.get('documentEnd').value.trim() : '1000',
      dateStart: this.docSearchForm.get('dateStart').value? this.docSearchForm.get('dateStart').value:'2023-01-01',
      dateEnd: this.docSearchForm.get('dateEnd').value?this.docSearchForm.get('dateEnd').value:'2025-12-31',
      template: this.id? this.id:'-1',
      isPrivateDocument: this.docSearchForm.get('isPrivateDocument').value,
      isInTrash: this.docSearchForm.get('isInTrash').value
    };

    // Navigate with the constructed query parameters
    this.router.navigate(['/search'], { queryParams, skipLocationChange: true });


    // Close modal
    this.closeModal.emit(false);
  }


  onTemplateChange(e: any) {
    this.id = e.target.value;
    const templateFormGroup = this.docSearchForm.get('templateForm') as FormGroup;// Access the templateForm control within docSearchForm
    this.requestFileService.getTemplateForm( this.id).subscribe({
      next: (data) => {
        this.formAttributes = data.data.indexes;
        this.formAttributes.forEach((field: any) => {
          // Add control to templateForm group
          templateFormGroup.addControl(field.indexFieldName, this.formBuilder.control(''));
        });
      },
      error: error => {
        console.log(error)
      }
    })
  }

  getKey(option: any) {
    return Object.keys(option)[0];
  }

  getValue(option: any) {
    return option[Object.keys(option)[0]];
  }


}
