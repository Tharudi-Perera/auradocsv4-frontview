import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
   SimpleChanges,
  ViewChild,
} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IN_FOLDER} from 'src/app/services/apis.path';
import {PnotifyService} from 'src/app/services/pnotify/pnotify.service';
import {UploadDocumentService} from 'src/app/services/upload-document/upload-document.service';
import {getPrevParent} from 'src/app/utility/paths.utility'


@Component({
  selector: 'app-index-document',
  templateUrl: './index-document.component.html',
  styleUrls: ['./index-document.component.css']
})
export class IndexDocumentComponent implements OnInit, AfterViewInit, OnChanges {
  filepath: string;
  filepathExists: boolean=false;
  base64Src: any = '';
  folderFiles = [];
  prevParent: string;
  hidden: boolean = false
  collapse: boolean=false;
  newBase64Value: any
  finalFolder = false
  fromFolderTree = false
  showBackFolder:boolean=false;
  @Input() showLoadingImage: boolean=false
  @ViewChild('indexDocumentPanelBody',{static:false}) indexDocumentPanelBody: ElementRef;
  loadingIconVisible: boolean=false;
  folderPath:string=''
  constructor(
    private route: ActivatedRoute,
    private documentService: UploadDocumentService,
    private pnotifyService: PnotifyService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) => {
      this.filepath = params['path'];
      if(params['fromFolderTree'] ==='true' && params['fromFolderTree'] !=null){
        this.fromFolderTree=true;
        this.showBackFolder=true;
      }
      if (this.filepath ) {
        this.documentService.getDocument(this.filepath).subscribe({
          next: data => {
            this.base64Src = data.data;
            this.filepathExists = true;
          },
          error: error => {
            this.filepathExists = false;
            console.log(1)
            this.pnotifyService.error({
              message: error.error.message,
              hasConfirm: false
            })
          }
        })
      } else {
        this.prevParent = IN_FOLDER;
        this.documentService.getFolderItems(IN_FOLDER).subscribe({
          next: (data) => this.folderFiles = data.data.sort((a, b) => (a.id > b.id) ? 1 : -1),
          error: (error) => {
            this.pnotifyService.error({
              message: error.error.message,
              hasConfirm: false
            })
          }
        })
      }
    });
  }
  updateQueryParam() {
    // Get the current query parameters
    const queryParams: Params = { ...this.route.snapshot.queryParams };
    // Update the value of the query parameter
    delete queryParams['fromFolderTree']
    // Navigate to the same route with updated query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge' // Use 'merge' to merge with existing query params
    });
  }

  getSubFileFromPending(path: string,backWordVal:boolean) {
    this.prevParent = getPrevParent(path);
    if(this.fromFolderTree && backWordVal){
      this.updateQueryParam()
      this.folderPath =  IN_FOLDER;
      this.showBackFolder=false
    }else if(this.fromFolderTree && !backWordVal){
      this.updateQueryParam();
      this.folderPath = path;
      this.showBackFolder=true
    }
    else if(this.finalFolder && backWordVal){
      this.folderPath =  path.split('/').slice(0, -2).join('/') + '/';
      this.showBackFolder=false
    }
    else if(this.finalFolder && !backWordVal){
      this.folderPath = path;
      this.showBackFolder=true
    }else if(!this.finalFolder && backWordVal){
      this.folderPath = path;
      this.showBackFolder=false;
    }else{
      this.folderPath = path;
      this.showBackFolder=true;
    }
    this.documentService.getFolderItems(this.folderPath).subscribe({
      next: (data) => {
        this.folderFiles = data.data.sort((a, b) => (a.id > b.id) ? 1 : -1);
        this.finalFolder = this.collapse = false;
      },
      error: () => {
        this.loadingIconVisible=true
        this.finalFolder = this.collapse = true;
        const newPath = path.endsWith('/') ? path.slice(0, -1) : path;
        this.router.navigate(['/index'], {queryParams: {path: newPath}});
        this.loadingIconVisible=false
      },
      complete:()=>{

      }
    });
  }

  hideIndexDataForm() {
    this.hidden = !this.hidden
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngAfterViewInit() {
    this.refreshNoOfPendingDocs();
  }

  // OnSave And Init with File Path

  refreshNoOfPendingDocs() {
    if (this.filepath) {
      const lastIndex = this.filepath.lastIndexOf('/');
      this.prevParent = this.filepath.slice(0, lastIndex + 1);
      this.documentService.getFolderItems(this.prevParent).subscribe({
        next: (data) => {
          this.folderFiles = data.data;
        },
        error: () => {
          this.folderFiles = []
        }
      })
      this.collapse = true;
    } else {
      this.collapse = false;
    }
  }

  refreshPendingDocs(event: boolean) {
    if(event){
      this.refreshNoOfPendingDocs();
    }
  }

  indexDocumentAccordionClicked(value: boolean) {
    this.collapse = value;
  }

  pendingDocumentAccordionClicked(value: boolean) {
    this.collapse = value;
  }

  getBase64Value(value: any) {
    this.newBase64Value = value
  }

  showLoadingImageMethod(value: boolean) {
    this.showLoadingImage = value
  }

}
