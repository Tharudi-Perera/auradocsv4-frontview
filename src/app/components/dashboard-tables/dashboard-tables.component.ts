import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {PaginationComponent} from "../pagination/pagination.component";
import {Router} from "@angular/router";



@Component({
  selector: 'app-dashboard-tables',
  templateUrl: './dashboard-tables.component.html',
  styleUrls: ['./dashboard-tables.component.css']
})
export class DashboardTablesComponent implements OnInit {
  @ViewChild(PaginationComponent) pagination: PaginationComponent;
  @Input() accountHistoryData:any[]=[];
  @Input() indexHistoryData:any[]=[];
  accessRequestData:any[]=[
  //   {
  //   id:'1643',
  //   requestedBy:'Janitha',
  //   requestedDate:'2024/03/05',
  //   message:'give permission'
  // }
  ]
  toDoListData:any[]=[
    // {
    //   toDoItem:'Test',
    //   noOfDays:'280',
    //   by:'Janitha'
    // },
    // {
    //   toDoItem:'Test',
    //   noOfDays:'280',
    //   by:'Janitha'
    // }
  ];

  toDoHistoryData:any[]=[
    // {
    //   toDoItem:'Test',
    //   noOfDays:'280',
    //   by:'Janitha',
    //   status:'accepted'
    // },
    // {
    //   toDoItem:'Test',
    //   noOfDays:'280',
    //   by:'Janitha',
    //   status:'accepted'
    // }
  ]

  options=[
    // {'dataNumber':10,'predefinedData':10},
    // {'dataNumber':25,'predefinedData':25},
    // {'dataNumber':50,'predefinedData':50},
    // {'dataNumber':100,'predefinedData':100},

  ]
  sharedWithMe:any[]=[]
  downloadHistory:any=[
    // {date:'2023-05-04', fileName:'text.zip'}
  ]
  pageNo: number=1;
  pageSize:number=10;
  downloadHistoryData=this.downloadHistory;
  constructor( private dashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    // this.dashboardService.getAllDashboardData().subscribe({
    //   next: data =>{
    //     this.accountHistoryData=data.data.accountHistory;
    //     this.indexHistoryData=data.data.indexHistory;
    //   },
    //   error: error =>{
    //
    //   }
    // })
  }


  getDownloadHistoryData(){
    return this.downloadHistory.slice((this.pageNo*this.pageSize),((this.pageNo*this.pageSize)+this.pageSize))
  }

  previous() {
    this.pageNo--;
    this.downloadHistoryData= this.getDownloadHistoryData();
  }

  next() {
    this.pageNo++
    this.downloadHistoryData= this.getDownloadHistoryData()

  }

  rawInAccountHistoryTableClicked(fileId) {
    this.router.navigate(['/search'], {queryParams: {id: fileId,showView:true}, skipLocationChange: true});
  }


}
