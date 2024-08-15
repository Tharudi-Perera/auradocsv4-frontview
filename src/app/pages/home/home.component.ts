import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { TestApiService } from 'src/app/services/test-api/test-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  indexHistoryData=[]
  accountHistoryData=[]
  constructor(
    private testApi: TestApiService, private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.testApi.testApi();

  }

  getIndexHistoryData(val: any[]) {
    this.indexHistoryData=val.sort((a, b) => a.fileId - b.fileId);
  }

  getAccountHistoryData(val: any[]) {
    this.accountHistoryData=val.sort((a, b) => a.fileId - b.fileId);
  }
}
