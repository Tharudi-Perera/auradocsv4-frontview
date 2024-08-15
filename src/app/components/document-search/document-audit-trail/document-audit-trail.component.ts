import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SearchOperation} from "../../../enum/search-operation.enum";
import {DocSearchService} from "../../../services/doc-search/doc-search.service";
import {ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'app-document-audit-trail',
  templateUrl: './document-audit-trail.component.html',
  styleUrls: ['./document-audit-trail.component.css']
})
export class DocumentAuditTrailComponent implements OnInit ,OnChanges{
  auditTrailData: any[]=[];
  auditTrailHeadings = ['UserId', 'Operation', 'Access Time'];
  documentAuditTrailAccordion="<i class='fa fa-clock-o'></i>  Audit Trail";
  @Input() isActive: boolean=false;
  @Input() id:number
  @Input() isViewSelectedOrViewAll:boolean=false

  constructor(private docSearchService: DocSearchService,private route: ActivatedRoute) {
  }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        switch (key) {
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
    if(!this.isViewSelectedOrViewAll){
      if(this.id!=null || this.id != undefined ) {
        this.docSearchService.getDocument(this.id, SearchOperation.AUDIT_TRAIL).subscribe({
          next: (data) => {
            this.auditTrailData=data.data
          },
          error: (error) => console.log(error),
        });
      }
    }
  }
}
