import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges,
} from '@angular/core';
import {PnotifyService} from 'src/app/services/pnotify/pnotify.service';
import {RequestFileService} from 'src/app/services/request-file/request-file.service';
import {UploadDocumentService} from 'src/app/services/upload-document/upload-document.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DocumentIndex} from 'src/app/models/IndexDocument.model';
import {DOCUMENT_INDEX} from 'src/app/utility/message-alerts.utility';
import {FolderTreeService} from "../../../services/folder-tree/folder-tree.service";
import {NoOfPendingDocsService} from "../../../services/noOfPendingDocs/no-of-pending-docs.service";


@Component({
  selector: 'app-index-form',
  templateUrl: './index-form.component.html',
  styleUrls: ['./index-form.component.css']
})
export class IndexFormComponent implements OnInit, AfterViewInit,OnChanges {

  @Input() filepath: string='';
  @Input() base64: string;
  @Output() refreshPendingDocs = new EventEmitter<boolean>();
  @Output() showLoadingImageEvent = new EventEmitter<boolean>();
  @Output() emptyFolderEvent=new EventEmitter<boolean>();
  constructor(
    private documentService: UploadDocumentService,
    private requestFileService: RequestFileService,
    private pnotifyService: PnotifyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private folderService: FolderTreeService,
    private noOfPendingDocsService: NoOfPendingDocsService,
    private route:ActivatedRoute

  ) {
    this.optionValueOfTemplates="-Select Template Option-";
    this.selectedFile=this.filepath.split('/').pop();
  }

  basepath: string;
  folderFiles: any[] = [];
  templates: any;
  formAttributes: any;
  indexForm: FormGroup;
  fileName: any
  openSubmitOptions: boolean = false;
  dataJSON: any[] = [];
  disableSaveButton: boolean
  clickedButton: string
  previouslySelectedAccessLevel: any
  dataLoaded = false;
  optionValueOfTemplates:string;
  selectedFile:string;
  id:number;
  templateAccessRight:string;
  ngOnInit(): void {
    this.basepath = this.getFileBasePath(this.filepath ? this.filepath : '');
    this.getDocumentsInFolder();
    this.requestFileService.getTemplates().subscribe({
      next: data => {
        this.templates = data.data
      },
      error: error => console.log(error)
    })
    this.indexForm = this.formBuilder.group({
      template: ['-Select Template Option-'],
      accessLevel: 'P',
      filenamesControl: this.filepath.split('/').pop()
    })

  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.filepath){
      this.selectedFile=this.filepath.split('/').pop();
    }
  }

  ngAfterViewInit() {
    this.dataLoaded = true;

  }

  getDocumentsInFolder() {
    this.documentService.getDocumentsInFolder(this.basepath).subscribe({
      next: data => {
        this.folderFiles = data.data;
      },
      error: error => {
        this.folderFiles = [];
      },
      complete: () => {

      }
    })
  }

  getFileBasePath(filePath: string): string {
    let folders = filePath.split("/");
    folders.pop();
    return folders.join("/");
  }

  getKey(option: any): string {
    return Object.keys(option)[0];
  }

  getValue(option: any): string {
    return option[Object.keys(option)[0]];
  }

  onTemplateChange(e: any) {
    this. id = e.target.value;
   // this.optionValueOfTemplates = e.target.options[this.id-1].title;
    this.requestFileService.getTemplateForm(this.id).subscribe({
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

  selectInputType(type: string): string {
    let dataType = '';
    if (type === 'Date') {
      dataType = 'date'
    } else if (type === 'OCR' || type === 'Folder-Name' || type === 'File-Name') {
      dataType = 'text'
    } else if (type === 'Barcode') {
      dataType = 'barcode'
    }
    return dataType;
  }

  onImageAreaClick(event: any) {
  }

  onSubmit(isFinalCall: boolean = false): any {
    this.disableSaveButton = true;
    this.createIndexedValueArray();
    this.showLoadingImageEvent.emit(true);
    if (isFinalCall) {
      this.documentService.indexDocument(this.dataJSON)
        .subscribe({
          next: () => {
            this.showLoadingImageEvent.emit(false);

            this.pnotifyService.success({
              message: 'Indexing completed',
              title: DOCUMENT_INDEX,
              hasConfirm: false
            })
          },
          error: (error) => {
            this.showLoadingImageEvent.emit(false)
            this.pnotifyService.error({
              message: error.message,
              title: DOCUMENT_INDEX,
              hasConfirm: false
            })
          },
          complete: () => {

            this.disableSaveButton = false;
            this.indexForm.reset();
            // pending no of docs refresh
            this.noOfPendingDocsService.findNoOfDocs();
            // refresh document names for selection
            for(const json of this.dataJSON ){
              const fileToRemove = this.folderFiles.indexOf(json.fileName);
              if (fileToRemove !=-1) {
                this.folderFiles.splice(fileToRemove, 1);

              }
            }

            this.dataJSON=[]
            //navigate to next doc
            if (this.folderFiles.length != 0) {
              this.onClickArrow(+1);
            }
            if(this.folderFiles.length==0){
              this.deleteQueryParam();
              this.disableSaveButton = true;
              this.router.navigate(['/home']);
              return
            }

            // emit value to index-form -document to say that to refresh pending docs inside the accordion
            this.refreshPendingDocs.emit(true);

            this.indexForm.get('filenamesControl').setValue(this.fileName); //onClickArrow will update this property

            this.indexForm.get('template').setValue(this.id );

            this.indexForm.get('accessLevel').setValue(this.previouslySelectedAccessLevel);
          }
        })
    }
  }
  deleteQueryParam() {
    // Get the current query parameters
    const queryParams: Params = { ...this.route.snapshot.queryParams };
    // Update the value of the query parameter
    delete queryParams['path']
    // Navigate to the same route with updated query parameters
    this.router.navigate(['/index'], {
      queryParams: queryParams,
      queryParamsHandling: 'merge' // Use 'merge' to merge with existing query params
    });
  }
  onClickArrow(num: number) {
    this.fileName=this.filepath.split('/').pop();
    const currentIndex = this.folderFiles.indexOf(this.fileName);
    const totalFiles = this.folderFiles.length;
    let nextIndex;
    if (num === -1) {
      nextIndex = (currentIndex - 1 + totalFiles) % totalFiles;
    } else {
      nextIndex = (currentIndex + 1) % totalFiles;
    }
    this.fileName = this.folderFiles[nextIndex];
    this.filepath = this.basepath + "/" + this.fileName
    this.router.navigate(["/index"], {queryParams: {path: this.filepath}});
    this.disableSaveButton = false;
  }

  onFileNameChange(event: any) {
    const val = event.target.value
    this.router.navigate(['/index'], {queryParams: {path: val}});
    this.disableSaveButton = false;
  }

  toggleSubmitOptions() {
    this.openSubmitOptions = !this.openSubmitOptions;
  }
  createIndexedValueArray(){
    const indexValue = this.formAttributes
      .filter((field: any) => this.indexForm.value[field.indexFieldName] !== '-Select option-')
      .map((field: any) => ({
      [field.indexFieldName]: this.indexForm.value[field.indexFieldName],
    }));
    let indexValueJson = JSON.stringify(indexValue);

    const outputJson: DocumentIndex = {
      indexValue: indexValueJson,
      fileName: this.indexForm.value['filenamesControl'],
      templateId: this.id.toString(),
      longitude: '2.334556',
      latitude: '3.45564',
      extractedText: '', // Replace with the actual extracted text
      accessLevel: this.indexForm.value['accessLevel'],
      filepath: this.filepath
    };
    this.dataJSON.push(outputJson)
  }
  onHoldNextClick() {
    this.createIndexedValueArray();
    this.onClickArrow(+1);
    this.toggleSubmitOptions();
  }

  skipToNextDocument() {
    this.onClickArrow(+1);
  }

  onAccessLevelClick(data: string): void {
    this.clickedButton = data
    this.indexForm.controls['accessLevel'].setValue(data);
    this.previouslySelectedAccessLevel = this.indexForm.controls['accessLevel'].value
  }


  reset() {
    this.clickedButton=this.templateAccessRight
  }
}
