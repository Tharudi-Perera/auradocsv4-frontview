import {
  Component, EventEmitter, Input, OnInit, Output, ViewChild,
} from '@angular/core';
import {AccordionComponent} from "../../components/basic/accordion/accordion.component";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: ['./document-search.component.css']
})
export class DocumentSearchComponent implements OnInit{
  constructor(private route:ActivatedRoute,private router: Router) {
  }

  @Input() show: boolean = false
  @ViewChild('searchResultAccordion') searchResultAccordion: AccordionComponent
  @ViewChild('viewAccordion') viewAccordion: AccordionComponent
  documentNos:any=[];
  viewSelectedStatus:any;
  viewAllStatus:any;
  currentPage:any;
  size:any;
  selectedIdsArray:any;
  docId:number;
  ngOnInit() {
    this.route.queryParams.subscribe((params:Params)=>{
      if('showView' in params){
        this.show=params['showView'] === 'true'
      }
    })
  }


  isShowViewButtonClicked(value: boolean) {
    this.show=value

  }

  searchViewAccordionClicked(value:boolean) {
    this.show=value
  }

  searchResultAccordionClicked(value: boolean) {
    this.show=value
  }

  getDocumentData(val:Event) {
    this.documentNos=val
  }

  isViewSelectedOrViewAllButtonsClicked(value: boolean) {
    this.show=value;
  }

  getDocId(id: any) {
    this.docId=id
  }

  getViewSelectedStatus(val: any) {
    this.viewSelectedStatus=val
  }

  getViewAllStatus(val: any) {
    this.viewAllStatus=val
  }

  getCurrentPage(val: any) {
    this.currentPage=val
  }

  getSize(val: any) {
    this.size=val
  }

  getSelectedIdsArray(val: any) {
    this.selectedIdsArray=val;
  }
}
