import {
  AfterViewInit,
  Component, EventEmitter,
  Input, OnChanges,
  OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef,
} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {SearchOperation} from "../../../enum/search-operation.enum";
import {DocSearchService} from "../../../services/doc-search/doc-search.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DocRequestService} from "../../../services/doc-request/doc-request.service";
import {StickynoteService} from "../../../services/stickynote/stickynote.service";

@Component({
  selector: 'app-document-search-view',
  templateUrl: './document-search-view.component.html',
  styleUrls: ['./document-search-view.component.css'],
})
export class DocumentSearchViewComponent implements OnInit, OnChanges,AfterViewInit {

  @Input() isActive: boolean = true;
  @Input() documentNos: any[]
  @Input() id:number
  @Input() viewSelected:boolean=false
  @Input() viewAll:boolean=false
  @Input() currentPage:number
  @Input() size:number=10;
  @Input() selectedIdsArray:number[];
  title: any = 'View';
  hidden: boolean = false;
  base64Src: any;
  askAccessRequest: boolean = false;
  fileRightsRequest: boolean = false;
  fileRightsRequestForm: FormGroup;
  originalFileName: string
  selectedButton: HTMLElement | null = null;
  isViewSelectedOrViewAll: boolean = false;
  @ViewChild(
    'StickyNoteTemplate',
    {
      read: ViewContainerRef,
    }
  ) stickyNoteTemplate: ViewContainerRef;

  constructor(private route: ActivatedRoute, private docSearchService: DocSearchService,
              private formBuilder: FormBuilder, private docRequestService: DocRequestService,
              private stickyNoteService: StickynoteService) {
  }

  ngOnInit(): void {
    this.fileRightsRequestForm = this.formBuilder.group({
      messageBody: '',
    })

  }
  ngAfterViewInit() {
    this.listenOpenStickyNotes();
  }

  private listenOpenStickyNotes(): void {
    this.stickyNoteService.open(() => this.stickyNoteTemplate);
  }
  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        switch (key) {
          case 'documentNos':
            this.documentNos = changes.documentNos.currentValue;
            break;
          case 'viewSelected':
            this.viewSelected = changes.viewSelected.currentValue;
            break;
          case 'viewAll':
            this.viewAll = changes.viewAll.currentValue;
            break;
          case 'id':
            this.id = changes.id.currentValue;
            break;
          case 'currentPage':
            this.currentPage = changes.currentPage.currentValue;
            break;
          case 'size':
            this.size = changes.size.currentValue;
            break;
          case 'selectedIdsArray':
            this.selectedIdsArray = changes.selectedIdsArray.currentValue;
            break;
          // Add more cases for other properties if needed
        }
      }
    }
    this.isViewSelectedOrViewAll = this.viewSelected || this.viewAll;
    if (!this.isViewSelectedOrViewAll) {
      if (this.id != null || this.id != undefined) {
        this.docSearchService.getDocument(this.id, SearchOperation.PDF_DATA).subscribe({
          next: (data) => {
            this.base64Src = data.data.metadata != '' ? data.data.metadata : null
          },
          error: (error) => {
            if (error.status == 403) {
              this.askAccessRequest = true;
            }
            console.log(error)
          },
        });
      }
    } else {
      if (this.viewAll) {
        this.docSearchService.viewAllDocuments(this.currentPage, this.size, 'all').subscribe({
          next: (data) => {
            this.base64Src = data.data != '' ? data.data : null
          },
          error: (error) => {
            if (error.status == 403) {
              this.askAccessRequest = true;
            }
            console.log(error)
          },
        });
      } else if (this.viewSelected) {
        this.docSearchService.viewSelectedDocuments(this.selectedIdsArray).subscribe({
          next: (data) => {
            this.base64Src = data.data != '' ? data.data : null
          },
          error: (error) => {
            if (error.status == 403) {
              this.askAccessRequest = true;
            }
            console.log(error)
          },
        })
      }
    }
  }



  hideViewDataForm() {
    this.hidden = !this.hidden
  }

  changeButtonColor(clickedButton: HTMLElement): void {
    if (this.selectedButton) {
      this.selectedButton.style.backgroundColor = '#595f69';
      // Set color to gray for previously selected button
    }

    clickedButton.style.backgroundColor = '#ff7b08'; // Set color to yellow for the clicked button
    this.selectedButton = clickedButton; // Update the selected button reference
  }

  showFileRightsRequest() {
    this.fileRightsRequest = true
  }

  onFileRightsRequestFormSubmit() {
    this.docRequestService.postAccessRequest(this.id, this.fileRightsRequestForm.value['messageBody'].toString()).subscribe({
      next: (data) => {

      },
      error: (e) => {
        console.log(e)
      }
    })

  }

  closeFileRightsRequestForm() {
    this.fileRightsRequest = false
  }

  getFileName(val: any) {
    this.originalFileName = val
  }


}
