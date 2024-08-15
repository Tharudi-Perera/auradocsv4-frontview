import {AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {NoOfPendingDocsService} from "../../services/noOfPendingDocs/no-of-pending-docs.service";

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css']
})
export class DashboardCardsComponent implements OnInit {
  totalIndexedDocuments: any;
  weeklyAddedIndexedDocuments: any;
  totalViewedDocuments: any;
  lastWeekViewedDocuments: any;
  selfIndexedCount: any;
  selfIndexedCountLastWeek: any;
  pendingDocuments: any;
  pendingDocumentsNoOfFolders: any;
  accountHistoryData:any[]=[];
  indexHistoryData:any[]=[];
  @Output() outputAccountHistoryData=new EventEmitter<any>()
  @Output() outputIndexHistoryData=new EventEmitter<any>()
  constructor( private dashboardService: DashboardService) { }

  ngOnInit(): void {

    // this.noOfPendingDocsService.findNoOfFolders();
    this.dashboardService.getAllDashboardData().subscribe({
      next: data =>{
        this.totalIndexedDocuments=data.data?.index?.total
        this.weeklyAddedIndexedDocuments=data.data?.index?.total
        this.totalViewedDocuments=data.data?.viewed?.total
        this.lastWeekViewedDocuments=data.data?.viewed?.lastWeek
        this.selfIndexedCount=data.data?.selfIndex?.total
        this.selfIndexedCountLastWeek=data.data?.selfIndex?.lastWeek
        this.pendingDocuments=data.data?.totalPendingDocuments
        this.pendingDocumentsNoOfFolders=data.data?.pendingFolders
        this.accountHistoryData=data.data?.accountHistory;
        this.indexHistoryData=data.data?.indexHistory;
      },
      error: error =>{

      },
      complete:()=>{
        this.outputAccountHistoryData.emit(this.accountHistoryData)
        this.outputIndexHistoryData.emit(this.indexHistoryData)
      }
    })

  }

}
