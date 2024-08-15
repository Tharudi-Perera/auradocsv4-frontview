import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DocSearchService} from "../../../services/doc-search/doc-search.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SEARCH_OPERATION} from "../../../utility/message-alerts.utility";
import {PnotifyService} from "../../../services/pnotify/pnotify.service";
import {SearchOperation} from "../../../enum/search-operation.enum";


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  constructor(
    private documentSearch: DocSearchService,
    private route: ActivatedRoute,
    private router: Router,
    private pnotifyService: PnotifyService,
  ) {
  }

  size: number = 10;
  page: number = 1;
  anyword: string;
  allwords: string;
  documentStart: number;
  documentEnd: number;
  dateStart: string;
  dateEnd: string;
  template: string;
  isPrivateDocument: boolean;
  isInTrash: boolean;
  isAdvanced: boolean;
  path: string;
  headingColumns = ['', 'Doc No', 'Document Type', 'Indexed Data', 'Preview', 'Indexed Date', 'Action'];
  documentData: any[] = [];
  totalPages: number;
  totalResults:number;
  currentPage: number;
  keyword: string
  loadingTime: any
  loadingTimeAdvanced: any
  loadingIconVisible: boolean = true
  showNormalTable: boolean = true;
  showGridTable: boolean = false;
  selectedIds: number[] = [];
  selectAllChecked: boolean = false;
  @ViewChild('showTableButton') showTableButton: ElementRef
  @ViewChild('showGridTableButton') showGridTableButton: ElementRef
  @Output() isShowViewButtonClicked = new EventEmitter<boolean>();
  @Output() sendDocumentNos=new EventEmitter<any>();
  @Output() isViewSelectedOrViewAllButtonsClicked=new EventEmitter<boolean>();
  @Output() sendId=new EventEmitter<any>();
  @Output() sendViewAllStatus=new EventEmitter<any>();
  @Output() sendViewSelectedStatus=new EventEmitter<any>();
  @Output() sendCurrentPage=new EventEmitter<any>();
  @Output() sendSize=new EventEmitter<any>();
  @Output() sendsSelectedIdsArray=new EventEmitter<any>();
  ngOnInit()  {

    this.route.queryParams.subscribe((params: Params) => {
      this.page =  params['page']?parseInt(params['page']):1;
      this.size = params['size']?parseInt(params['size']):10;
      this.isAdvanced = params['isAdvanced'] === 'true';
      this.anyword = params['anyword'];
      this.allwords = params['allwords'];
      this.documentStart =params['documentStart'] ?parseInt(params['documentStart']):0;
      this.documentEnd =params['documentEnd']? parseInt(params['documentEnd']):1000;
      this.dateStart = params['dateStart'];
      this.dateEnd = params['dateEnd'];
      this.template = params['template'];
      this.isPrivateDocument = (params['isPrivateDocument'] === 'true');
      this.isInTrash = (params['isInTrash'] === 'true');
      if (this.anyword == null) {
        this.keyword = 'all';
      }else{
        this.keyword = this.anyword;
      }
      this.loadingIconVisible = true;
      if (this.isAdvanced) {
        const startTimeAdvanced = Date.now();
        this.documentSearch.advancedSearch(
          this.page,
          this.size,
          this.anyword,
          this.allwords,
          this.documentStart,
          this.documentEnd,
          this.dateStart,
          this.dateEnd,
          this.template,
          this.isPrivateDocument,
          this.isInTrash
        ).subscribe({
          next: data => {
            this.documentData = data.data.result
            this.totalPages = data.data.totalPages
            this.currentPage = data.data.currentPage
            this.totalResults = data.data.totalResults
          },
          error: error => {
            if (error.status == 404) {
              this.documentData.length = 0;
              this.loadingIconVisible = false;
            } else {
              this.documentData.length = 0;
              this.loadingIconVisible = false;
              this.pnotifyService.error({
                message: error,
                title: SEARCH_OPERATION,
                hasConfirm: false,
                confirmMessage: '',
              })
              this.router.navigate(['/home']);
            }
          },
          complete: () => {
            // this.documentData.map(json=>{
            //   this.documentSearch.getDocument(json.id_l,SearchOperation.IMAGE_DATA).subscribe({
            //   })
            // })
            const endTimeAdvanced = Date.now();
            this.loadingTimeAdvanced = endTimeAdvanced - startTimeAdvanced;
            this.loadingIconVisible = false;
            this.selectedIds=[]
            this.selectAllChecked = false;
          }
        })
      } else {
        const startTime = Date.now();
        this.documentSearch.searchAll(this.page, this.size, this.keyword).subscribe({
          next: data => {
            this.documentData = data.data.result;
            this.totalPages = data.data.totalPages;
            this.currentPage = data.data.currentPage;
            this.totalResults = data.data.totalResults
          },
          error: error => {
            if (error.status == 404) {
              this.documentData.length = 0;
              this.loadingIconVisible = false;
            } else {
              this.documentData.length = 0;
              this.loadingIconVisible = false;
              this.pnotifyService.error({
                message: error,
                title: SEARCH_OPERATION,
                hasConfirm: false,
                confirmMessage: '',
              })
              this.router.navigate(['/home']);
            }
          },
          complete: () => {
            const endTime = Date.now();
            this.loadingTime = endTime - startTime;
            this.loadingIconVisible = false;
            let newDocNo=this.documentData.map((json)=>{
              return json['id_l']
            })
            // this.documentData.map(json=>{
            //   this.documentSearch.getDocument(json.id_l,SearchOperation.IMAGE_DATA).subscribe({
            //
            //   })
            // })
            this.sendDocumentNos.emit(newDocNo)
            this.selectedIds=[]
            this.selectAllChecked = false;
          }
        })
      }
    });




  }
  deleteQueryParam(paramName: string){
    // Get the current query parameters
    const queryParams = { ...this.router.parseUrl(this.router.url).queryParams };

    // Delete the specific parameter if it exists
    if (queryParams.hasOwnProperty(paramName)) {
      delete queryParams[paramName];
    }
  }
  showView(id: any) {

    this.isShowViewButtonClicked.emit(true);
    this.sendId.emit(id);
    this.sendViewAllStatus.emit(false);
    this.sendViewSelectedStatus.emit(false);
  }


  showTableButtonClicked() {
    this.showNormalTable = true;
    this.showGridTable = false
    this.showTableButton.nativeElement.style.setProperty('background-color', '#FF7B08', 'important');
    this.showGridTableButton.nativeElement.style.setProperty('background-color', '', 'important');
  }

  showGridTableButtonClicked() {
    this.showNormalTable = false;
    this.showGridTable = true;
    this.showTableButton.nativeElement.style.setProperty('background-color', '', 'important');
    this.showGridTableButton.nativeElement.style.setProperty('background-color', '#FF7B08', 'important');

  }

  viewAll() {
    this.isViewSelectedOrViewAllButtonsClicked.emit(true);
    this.sendViewAllStatus.emit(true);
    this.sendViewSelectedStatus.emit(false);
    this.sendCurrentPage.emit(this.currentPage);
    this.sendSize.emit(this.size);
    this.sendsSelectedIdsArray.emit(null);
    // this.router.navigate(['/search'],{queryParams: {viewAll:'true',viewSelected:null,currentPage:this.currentPage,size:this.size,selectedIdsArray:null},skipLocationChange: true,queryParamsHandling: 'merge',});
  }

  viewSelected() {
    this.isViewSelectedOrViewAllButtonsClicked.emit(true);
    this.sendViewAllStatus.emit(false);
    this.sendViewSelectedStatus.emit(true);
    this.sendCurrentPage.emit(null);
    this.sendSize.emit(null);
    this.sendsSelectedIdsArray.emit(this.selectedIds);
    // this.router.navigate(['/search'],{queryParams: {viewSelected:'true',viewAll:null,selectedIdsArray:this.selectedIds,currentPage:null,size:null},skipLocationChange: true,queryParamsHandling: 'merge',});
  }
  toggleSelection(id: number) {
    if (this.isSelected(id)) {
      this.selectedIds = this.selectedIds.filter(item => item !== id);
    } else {
      this.selectedIds.push(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }

  selectAllDocs() {
    this.selectAllChecked = !this.selectAllChecked;
    // Update the selection status of all checkboxes
    this.documentData.forEach(document => {
      this.toggleSelection(document.id_l);
      document.selected = this.selectAllChecked;
    });
  }
}
