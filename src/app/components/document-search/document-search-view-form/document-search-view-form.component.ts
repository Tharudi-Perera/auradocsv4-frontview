import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-document-search-view-form',
  templateUrl: './document-search-view-form.component.html',
  styleUrls: ['./document-search-view-form.component.css']
})
export class DocumentSearchViewFormComponent implements OnInit, OnChanges {
  documentSearchViewForm: FormGroup;
  document: any[];
  documentNo: any[];
  activeElement: string = 'document-details-groups';
  optionValueOfDocumentNo: string = "-Select Option-";
  templateName: string;
  fileName:string
  templateId:number
  @Input() documentNos: any[];
  @Output() sendFileName = new EventEmitter<any>();
  @Input() id: number
  @Input() isViewSelectedOrViewAll: boolean = false
  @Input() editDocumentDetailsButtonClicked:boolean=false;
  @Input() base64Src:any;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
    this.documentSearchViewForm = this.formBuilder.group({
      selectDocument: '',
      documentNo: ''
    })

  }
  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        switch (key) {
          case 'documentNos':
            this.documentNo = changes.documentNos.currentValue;
            break;
          case 'id':
            this.id = changes.id.currentValue;
            break;
          case 'isViewSelectedOrViewAll':
            this.isViewSelectedOrViewAll = changes.isViewSelectedOrViewAll.currentValue;
            break;
          // Add more cases for other properties if needed
        }
      }
    }
  }
  onSubmit() {

  }

  changesActiveAccordion(tabName: string) {
    this.activeElement = tabName;
  }

  onDocumentNoChange(val: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {id: parseInt(val.target.value)},
      queryParamsHandling: 'merge'
    });
  }


  onClickArrow(num: number) {
    const currentIndex = this.documentNo.indexOf(this.id);
    const totalNoOfDocuments = this.documentNo.length;

    let nextIndex;
    if (num === -1) {
      nextIndex = (currentIndex - 1 + totalNoOfDocuments) % totalNoOfDocuments;
    } else {
      nextIndex = (currentIndex + 1) % totalNoOfDocuments;
    }

    this.id = this.documentNo[nextIndex];
    this.router.navigate(
      [], {
        relativeTo: this.route,
        queryParams: {id: this.id},
        queryParamsHandling: 'merge'
      }
    );

  }

  getTemplateName(val: string) {
    this.templateName = val;
  }

  getFileName(val: string) {
    this.sendFileName.emit(val);
    this.fileName=val;
  }


  getStatusOfShowEditDetailsAccordion(event:boolean) {
    this.editDocumentDetailsButtonClicked=event
  }

  getTemplateId(val: number) {
    this.templateId=val
  }
}
